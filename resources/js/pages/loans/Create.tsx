import { useTranslations } from "@/hooks/use-translations";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {ArrowUpDown } from "lucide-react";
import { PageProps } from "@/types";
import { LoanLayout } from "@/layouts/loans/LoanLayout";
import { LoanForm } from "./Components/LoanForm";

interface CreateLoanProps extends PageProps {


}

export default function createLoan({}:CreateLoanProps) {
  const { t } = useTranslations();
  const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const bookISBN = searchParams.get("isbn");


  return (
    <LoanLayout title={t("ui.loans.create")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
            <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                        <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                            <div className="flex items-center gap-2">
                                <Icon iconNode={ArrowUpDown} className="w-6 h-6 text-blue-500" />
                                <Label className="text-2xl font-black">{t("ui.loans.create")}</Label>
                            </div>
                            <p className="text-gray-600">{t("ui.loans.createLoan.subtitle")}</p>
                        </header>
                         <LoanForm
                         bookISBN = {bookISBN}

                         />
        </div>
        </div>
      </div>
    </LoanLayout>
  );
}
