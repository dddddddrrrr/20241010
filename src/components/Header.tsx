import React from "react";
import { Button } from "~/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { cn } from "~/lib/utils";

export const Header: React.FC = () => {
  return (
    <header>
      <div className="mx-auto p-4">
        <div className="flex h-16">
          <div className="flex w-full justify-end space-x-4">
            <Button>Sign in</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
