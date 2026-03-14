import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import Select from "./Select";
import Input from "./input";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "./Button";

function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [date, setDate] = useState("");
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug == "MyProfile") {
      //fetching a existing profile
      if (userData) {
        appwriteService.getProfile(userData.$id).then((data) => {
          if (data) setProfile(data);
          const isoString = `${profile.birthDate}`
            .split("T")[0]
            .split("-")
            .reverse()
            .join("-");
          setDate(isoString);
        });
      }
    }
  },[userData,navigate]);

  const { register, handleSubmit ,formState: { errors } } = useForm({
    defaultValues: {
      fullName: userData?.name || "",
      userId: userData?.$id || "",
      email: userData?.email || "",
    },
  });

  // const isoString=`${profile.birthDate}`.split('T')[0].split('-').reverse().join('-')

  const create = async (data) => {
    if (slug == "My") {
      try {
        //creating a new profile
        console.log("loading...");
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.profilePic = fileId;

          const dbPost = await appwriteService.createProfile(data);

          if (dbPost) {
            navigate(`/Profile`);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // editing a existing profile
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(profile.profilePic);
      }

      const dbPost = await appwriteService.updateProfile(profile.$id, {
        ...data,
        profilePic: file ? file.$id : undefined,
      });
    }
    navigate("/Profile");
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              defaultValue={profile?.fullName}
              {...register("fullName", {
                required: true,
              })}
            />

            <Input
              label="Profile Pic :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: true })}
            />

            <Input
              label="BirthDate :"
              type="date"
              defaultValue="03-03-2026"
              placeholder="Enter your BirthDate"
              {...register("birthDate", {
                required: true,
              })}
            />
            <Select
              options={["Male", "Female", "Other"]}
              label="Gender"
              defaultValues={profile?.gender}
              className="mb-4"
              {...register("gender", { required: true })}
            />
            <Input
              label="About :"
              type="text"
              defaultValue={profile?.bio}
              placeholder="Enter some thing about your self"
              {...register("bio", {
                required: true,
              })}
            />
            <Input
              label="Proffession"
              type="text"
              defaultValue={profile?.proffession}
              placeholder="Enter about your Proffession"
              {...register("proffession", {
                required: true,
              })}
            />
            <Input
              label="Location :"
              type="text"
              defaultValue={profile?.location}
              placeholder="Enter your Location"
              {...register("location", {
                required: true,
              })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <Button type="submit" className="w-full">
              {slug=="MyProfile"?"Edit Profile":"Create Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
