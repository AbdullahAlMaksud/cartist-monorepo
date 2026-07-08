import { CompassIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { EmptyState } from "@/shared/components/empty-state";

const NotFound = () => {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <EmptyState
          icon={CompassIcon}
          title="পাওয়া যায়নি"
          description="এই পাতাটি খুঁজে পাওয়া যাচ্ছে না। হয়তো এটি সরানো হয়েছে অথবা লিংকটি ভুল।"
          action={
            <Button asChild>
              <Link href={ROUTES.LISTS}>হোমে ফিরে যান</Link>
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default NotFound;
