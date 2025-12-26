import { EmptyState } from "@/components/general/EmptyState";
import React from "react";
import { JobCard } from "@/components/general/JobCard";
import { requireUser } from "@/app/utils/hooks";
import { prisma } from "@/app/utils/prisma";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      job: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createdAt: true,
          Company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });

  return data;
}

type Favorite = Awaited<ReturnType<typeof getFavorites>>[number];

const FavoritesPage = async () => {
  const session = await requireUser();
  const favorites = await getFavorites(session.id as string);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        description="You don't have any favorites yet."
        buttonText="Find a job"
        href="/jobs"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5   gap-4">
      {favorites.map((favorite: Favorite) => (
        <JobCard job={favorite.job} key={favorite.job.id} />
      ))}
    </div>
  );
};

export default FavoritesPage;
