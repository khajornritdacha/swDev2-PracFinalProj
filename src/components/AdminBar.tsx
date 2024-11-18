import React from "react";
import Link from "next/link";
import createIcon from "../../public/logo/Create.svg";
import editIcon from "../../public/logo/Edit.svg";
import Image from "next/image";
import { Session } from "inspector/promises";

// Props type for admin status and restaurant ID
interface AdminBarProps {
  isAdmin: boolean; // Whether the user is an admin
  rid?: string; // Restaurant ID (optional)
}

const AdminBar: React.FC<AdminBarProps> = ({ rid }) => {
  if (!Session.user.role) return null; // Hide the component if the user is not an admin

  return (
    <div className="flex w-full justify-center items-center opacity-70">
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
    </div>
  );
};

export default AdminBar;
