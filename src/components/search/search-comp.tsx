"use client";
import Link from "next/link";
import React, { useEffect } from "react";

interface SearchCompProps {
  businesses: any[] | null;
  params?: { [key: string]: string | string[] | undefined };
}

export default function SearchComp({ businesses, params }: SearchCompProps) {
  const [bizData, setBizData] = React.useState<any[] | null>(businesses);

  useEffect(() => {
    const addrUrl = new URLSearchParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        addrUrl.append(key, params[key] as string);
      });
    }

    window.history.pushState({}, "", `?${addrUrl.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchBusinesses = async (query: string) => {
    try {
      if (!query || query.length === 0) return;
      const searchParams = new URLSearchParams();
      searchParams.delete("query");

      if (params) {
        Object.keys(params).forEach((key) => {
          searchParams.append(key, params[key] as string);
        });
      }
      searchParams.append("query", query);
      const req = await fetch(
        `http://localhost:5005/api/businesses/search?${searchParams.toString()}`
      );
      const resp = await req.json();
      const bizData = resp.data.businessProfiles.data;

      setBizData(
        bizData.map((biz: any) => {
          return {
            name: biz.name,
            city: biz.city,
            email: biz.businessEmail,
            id: biz.uuid,
          };
        })
      );
    } catch (e: any) {
      console.log(e);
      alert("An error occurred. Please try again later.");
      setBizData(null);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start">
        <div className="w-full flex items-center justify-start mt-2">
          <input
            type="text"
            placeholder="Search businesses"
            className="border-black border-2 px-4 py-2 w-full rounded-md text-sm"
            onSubmit={async (e: any) => {
              //   e.preventDefault();
              await searchBusinesses(e.target.value);
            }}
            autoComplete="off"
            onChange={async (e: any) => {
              await searchBusinesses(e.target.value);
            }}
          />
        </div>

        <br />
        <div className="w-full h-full flex flex-col items-start justify-start gap-2">
          {bizData ? (
            bizData.length > 0 ? (
              bizData.map((business, index) => (
                <Link
                  key={index}
                  href={`/biz/${business.id}`}
                  className="text-blue text-sm font-medium underline"
                >
                  {index + 1}. {business.name} - {business.city} -{" "}
                  {business.email}
                </Link>
              ))
            ) : (
              <p className="text-black font-normal">No businesses found.</p>
            )
          ) : (
            <p className="text-black font-normal">No businesses found.</p>
          )}
        </div>
      </div>
    </>
  );
}
