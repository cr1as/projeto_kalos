'use client'

import { useRouter } from "next/router";
import { useEffect } from "react";

const page: React.FC = ()  => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    router.push("/home");
  }, [router]);

  return null;
} 
export default page;