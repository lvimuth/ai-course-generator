import React, { useState } from "react";
import {
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineEye,
} from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

function DropdownOption({ children, handleOnDelete, course }) {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <div>
            <DropdownMenuItem
              onClick={() => router.replace("/course/" + course?.courseId)}
            >
              <HiOutlineEye />
              View
            </DropdownMenuItem>
          </div>
          <div>
            <DropdownMenuItem>
              <HiOutlinePencilAlt />
              Edit
            </DropdownMenuItem>
          </div>
          <div>
            <DropdownMenuItem onClick={() => setOpenDialog(true)}>
              <HiOutlineTrash />
              Delete
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleOnDelete();
                setOpenDialog(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DropdownOption;
