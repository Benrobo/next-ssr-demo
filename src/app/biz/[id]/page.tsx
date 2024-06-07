import BizProfile from "@/components/bizProfile";
import React from "react";

interface BizPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BizPage({ searchParams, params }: BizPageProps) {
  const bizId = (params as any)?.id;
  const bizData = await getBusinessById(bizId);

  return (
    <>
      <BizProfile bizData={bizData} />
    </>
  );
}

interface BizInfo {
  name: string;
  city: string;
  email: string;
  id: string;
}

// Same as this:  oN the server only.
async function getBusinessById(bizId: string) {
  let error = null;
  let data: {
    name: string;
    city: string;
    email: string;
    id: string;
  } | null = null;

  try {
    const req = await fetch(
      `http://localhost:5005/api/business-profile/list/${bizId}`
    );
    const resp = await req.json();
    const bizData = resp.data.details;
    data = {
      name: bizData.name,
      city: bizData.city,
      email: bizData.businessEmail,
      id: bizData.uuid,
    };
  } catch (e: any) {
    error = e;
    console.log(e);
  }

  return {
    data,
    error,
  };
}

export async function generateMetadata(props: BizPageProps) {
  const bizData = await getBusinessById((props as any)?.params?.id);
  return {
    title: bizData.data?.name ?? "Business Profile",
  };
}
