import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "./Button";

export interface ProjectCardProps {
  title: string;
  description: string;
  githubOwner: string;
  githubSlug: string;
}

export function ProjectCard({
  title,
  description,
  githubOwner,
  githubSlug,
}: ProjectCardProps): React.JSX.Element {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grow">{description}</CardContent>
      <CardFooter>
        <Button size="lg" asChild>
          <a
            className="w-full no-underline visited:text-current"
            href={`https://github.com/${githubOwner}/${githubSlug}`}
          >
            <GitHubLogoIcon className="mr-2 size-6" aria-label="GitHub logo" />
            View Project Page
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
