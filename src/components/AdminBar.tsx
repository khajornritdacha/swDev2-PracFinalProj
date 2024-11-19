"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import createIcon from "../../public/logo/Create.svg";
import editIcon from "../../public/logo/Edit.svg";
import deleteIcon from "../../public/logo/Delete.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axiosInstance from "@/libs/axios"; 
import DeletePopUp from "../components/DeletePopUp"; 
import { redirect } from "next/navigation";

// Props type for admin status and restaurant ID
interface AdminBarProps {
  rid?: string; // Restaurant ID (optional)
}

const AdminBar: React.FC<AdminBarProps> = ({ rid }) => {
  const { data: session } = useSession();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  if (!session || !session.user.role) return null; // Hide the component if the user is not an admin

  const handleDelete = async () => {
    try {
      if (rid) {
        const url = `restaurants/${rid}`;
        const res = await axiosInstance.request({
          url: url,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        if (res.status === 200) {
          alert("Restaurant deleted successfully.");
          setShowDeletePopup(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="w-full h-full">
    <div className="flex w-full justify-center items-center opacity-70 w-full h-full">
      {/* Create New Restaurant Button */}
      <Link
        href="/restaurant/create"
        className="w-full flex gap-2 justify-center items-center h-full text-black font-light bg-white hover:bg-slate-200 text-center p-1"
      >
        <div className="h-5 w-5 relative">
          <Image
            src={createIcon}
            alt="Create Icon"
            fill={true}
            className="object-contain"
          />
        </div>
        <div>Add New Restaurant</div>
      </Link>

      {/* Edit Restaurant Button: Only show if `rid` is provided */}
      {rid && (
        <Link
          href={`/restaurant/${rid}/edit`}
          className="w-full flex gap-2 justify-center items-center h-full text-black font-light bg-white hover:bg-slate-200 text-center p-1"
        >
          <div className="h-5 w-5 relative">
            <Image
              src={editIcon}
              alt="Edit Icon"
              fill={true}
              className="object-contain"
            />
          </div>
          <div>Edit Restaurant</div>
        </Link>
      )}

      {/* Delete Restaurant Button */}
      {rid && (
        <button
          className="w-full flex gap-2 justify-center items-center h-full text-black font-light bg-white hover:bg-slate-200 text-center p-1"
          onClick={() => setShowDeletePopup(true)}
        >
          <div className="h-5 w-5 relative">
            <Image
              src={deleteIcon}
              alt="Delete Icon"
              fill={true}
              className="object-contain"
            />
          </div>
          <div>Delete Restaurant</div>
        </button>
      )}
  </div>
      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed opacity-100">
          <DeletePopUp
            onClose={() => setShowDeletePopup(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default AdminBar;
