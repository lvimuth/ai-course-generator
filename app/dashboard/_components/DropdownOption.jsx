import React, { useState } from "react";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
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

function DropdownOption({ children, handleOnDelete }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="hover:bg-green-400 rounded-sm ">
            <DropdownMenuItem>
              <HiOutlinePencilAlt />
              Edit
            </DropdownMenuItem>
          </div>
          <div className="hover:bg-red-400 rounded-sm">
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleOnDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DropdownOption;
