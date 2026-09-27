import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "./Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./Card";

export function GizmoCard(props: {
  title: string;
  description: string;
  slug: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button size="lg" asChild>
          <a className="w-full" href={`/gizmos/${props.slug}/`}>
            <RocketIcon className="mr-2 size-6" aria-hidden />
            Open Gizmo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
