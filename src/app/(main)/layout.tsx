"use client"
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch} from "@/lib/hook";
import getProfileController from "@/utils/apiControllers/getProfileController";
import { getBusinesscategory } from "@/utils/apiControllers/businessCategoryController";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}
) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect (() => {
    const token  = localStorage.getItem("token");
    if (token){
      // console.log("im inide layout",router.asPath)
      getProfileController(dispatch, router);
      getBusinesscategory(router, dispatch);
    }else {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
        <div className="flex h-screen">
            <Navbar />
            <Sidebar  />
            <div className="flex-grow mt-16 sm:ml-64">
              {children}
            </div>
        </div>
  );
}
