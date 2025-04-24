import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2, Book} from "lucide-react";
import { LoanLayout } from "@/layouts/loans/LoanLayout";
import { LoanForm } from "./Components/LoanForm";

interface EditLoanProps extends PageProps {
    loan: {
        id: string;
        email:string;
        isbn:string;
        loan_duration: number;
    }
    email:string;
    isbn:string;
    page?: string;
    perPage?: string;

}

export default function EditLoan({loan,email,isbn, page, perPage}: EditLoanProps) {
  const { t } = useTranslations();

  return (
    <LoanLayout title={t("ui.loans.edit")}>
      <div className="flex justify-center items-start py-1 px-6">
        <div className="w-full max-w-3xl">
         <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
                                 <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                                     <div className="flex items-center gap-2">
                                         <Icon iconNode={Book} className="w-6 h-6 text-blue-500" />
                                         <Label className="text-2xl font-black">{t("ui.loans.editLoan.title")}</Label>
                                     </div>
                                     <p className="text-gray-600">{t("ui.books.editLoan.subtitle")}</p>
                                 </header>
          <LoanForm
            initialData={loan}
            page={page}
            perPage={perPage}
            email = {email}
            isbn = {isbn}
          />
        </div>
      </div>
      </div>
    </LoanLayout>
  );
}
