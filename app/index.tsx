"use client";
import { DescentFooter, DescentMenu } from "@/components";
import DescentHeader from "@/components/header";
import {
  DashboardBlob1,
  DashboardBlob2,
  DashboardBlob3,
  DashboardBlob4,
} from "@/public/icons";
import { ReactNode } from "react";

const AppHome = ({ children }: { children: ReactNode }) => {
  return (
    <main className="font-SF_UI_Display">
      <DescentHeader />
      <div>{children}</div>
      <DescentFooter />
      <DescentMenu />

      <div className="hidden xl:block">
        <div className="absolute top-0 right-0">
          <DashboardBlob1 />
        </div>
        <div className="absolute top-0 left-0">
          <DashboardBlob2 />
        </div>
        <div className="absolute -bottom-52 left-0">
          <DashboardBlob3 />
        </div>
        <div className="absolute -bottom-52 right-0">
          <DashboardBlob4 />
        </div>
      </div>
    </main>
  );
};

export default AppHome;
