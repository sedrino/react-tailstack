import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@/lib/form";
import { z } from "zod";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <form.Provider>
        <form
          className="max-w-lg space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange: z.string().min(3, "Name must be at least 3 characters"),
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <Label htmlFor={field.name}>Name:</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: any) => field.handleChange(e.target?.value)}
                  />
                </>
              );
            }}
          />
          <Button type="submit">Click me</Button>
        </form>
      </form.Provider>
    </div>
  );
}
