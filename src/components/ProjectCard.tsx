import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../classnames";

export interface ProjectCardProps {
  title: string;
  description: string;
  githubOwner: string;
  githubSlug: string;
}

const techVariants = cva("", {
  variants: {
    tech: {
      rust: "text-orange-600",
      go: "text-cyan-600",
      nix: "text-violet-600",
      typescript: "text-sky-600",
    },
  },
});

export function ProjectCard({
  title,
  description,
  githubOwner,
  githubSlug,
  tech,
}: ProjectCardProps & VariantProps<typeof techVariants>) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title}
          {tech && (
            <Badge className={cn(techVariants({ tech }))} variant="outline">
              {tech}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow">{description}</CardContent>
      <CardFooter>
        <Button size="lg" asChild>
          <a
            className="w-full"
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
