"use client";
import React from "react";

interface Props {
  bizData: {
    data: {
      name: string;
      city: string;
      email: string;
      id: string;
    } | null;
    error: any;
  };
}

export default function BizProfile({ bizData }: Props) {
  return (
    <div className="w-full px-4 py-7 flex flex-col items-start justify-start">
      <p
        className="underline cursor-pointer text-xs"
        onClick={() => window.history.back()}
      >
        Back
      </p>
      {bizData?.error && (
        <div className="w-full flex flex-col items-start justify-start">
          <p className="text-red-500">An error occurred.</p>
          <p className="text-red-500">Please try again later.</p>
        </div>
      )}
      <br />
      {bizData.data && (
        <div className="w-full flex flex-col items-start justify-start">
          {/* not a loop */}
          <h1 className="font-bold text-2xl">{bizData.data.name}</h1>
          <p>{bizData.data.city}</p>
          <p>{bizData.data.email}</p>
        </div>
      )}
    </div>
  );
}
