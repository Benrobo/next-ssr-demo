import SearchComp from "@/components/search/search-comp";
import React from "react";

interface SearchPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { data, error, params } = await getBusinesses(searchParams || {});

  return (
    <>
      <div className="w-full px-4 py-7 flex flex-col items-start justify-start">
        <h1>Search for businesses.</h1>
        {!error && <SearchComp businesses={data} params={params} />}

        {error && (
          <div className="w-full flex flex-col items-start justify-start">
            <p className="text-red-500">An error occurred.</p>
            <p className="text-red-500">Please try again later.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;

interface getBusinessProps {
  [key: string]: string | string[] | undefined;
}

// This function is used to fetch data from the API.
// Only on the SERVER
async function getBusinesses(props: getBusinessProps) {
  let error = null;
  let data: any[] | null = null;
  const searchParams = new URLSearchParams();

  Object.keys(props).forEach((key) => {
    searchParams.append(key, props[key] as string);
  });

  try {
    const req = await fetch(
      `http://localhost:5005/api/businesses/search?${searchParams.toString()}`
    );
    const resp = await req.json();
    const bizData = resp.data.businessProfiles.data;

    data = bizData.map((biz: any) => {
      return {
        name: biz.name,
        city: biz.city,
        email: biz.businessEmail,
        id: biz.uuid,
      };
    });
  } catch (e: any) {
    error = e;
    console.log(e);
  }

  return {
    data,
    error,
    params: props,
  };
}

// Netxjs (APP router) doesn't support Head component.
// generateMetadata is used in place of that.

export async function generateMetadata(props: SearchPageProps) {
  const cn = (props as any)?.searchParams["cn"] ?? "Country";
  const dyTitle = `Top 10 Businesses in ${cn}`;
  return {
    title: dyTitle,
  };
}
