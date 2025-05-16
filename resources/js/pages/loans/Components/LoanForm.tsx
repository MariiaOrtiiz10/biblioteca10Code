import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2, Mail, Barcode, Clock, ChevronsUpDown, Check } from "lucide-react";
import { Card } from "@/components/ui/card"
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



interface LoanFormProps {
    initialData?: {
        id: string;
        email:string;
        isbn:string;
        loan_duration: number;
    };
    //paginación
    page?: string;
    perPage?: string;
    email:string;
    isbn:string;
    bookISBN: string|null;
    allBooksISBN: any[];
    usersData: any[];


}
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="mt-1 text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    );
}

export function LoanForm({initialData, page, perPage, bookISBN, email, isbn, allBooksISBN, usersData}:LoanFormProps){
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    //console.log(usersData);
       const [open, setOpen] = useState(false)
        const [value, setValue] = useState("")
    //console.log(usersEmail);
    //console.log(isbn);

    const form = useForm({
        defaultValues: {
            email: initialData?.email ?? email ?? '',
            isbn: initialData?.isbn ?? bookISBN ?? isbn ?? '',
            loan_duration: initialData?.loan_duration ?? undefined,

        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["loans"] });
                    // Construct URL with page parameters
                    let url = "/loans";
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }
                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(
                            initialData
                                ? t("messages.loans.error.update")
                                : t("messages.loans.error.create")
                        );
                    }
                },
            };
            if (initialData) {
                router.put(`/loans/${initialData.id}`, value, options,);
            } else {
                router.post("/loans", value, options);
            }
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };
    return(
      <div>
            <hr className="dark:border-black "></hr>
            <div className="py-1 bg-gray-100 dark:bg-[#272726]"></div>
            <form onSubmit={handleSubmit} className="space-y-1  bg-gray-100 dark:bg-[#272726] " noValidate>
                <Card>
                <div className="ml-5 mr-5">
                    <div className="mb-4">
                        <form.Field
                            name="email"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!value) {
                                        return t("ui.validation.required", {
                                            attribute: t("ui.loans.fields.email").toLowerCase(),
                                        });
                                    }
                                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                        return t("ui.validation.email", { attribute: t("ui.loans.fields.email").toLowerCase() })
                                    }
                                    const emailExists = usersData?.some(user => user.email === value);
                                    if (!emailExists) {
                                        return t("ui.validation.emailLoan");
                                    }

                                    return undefined;
                                },
                            }}
                    >
                        {(field) => (
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                <Icon iconNode={Mail} className="w-5 h-5" />
                                <Label htmlFor={field.name}>{t("ui.loans.fields.email")}</Label>
                                </div>
                                   <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                            disabled={form.state.isSubmitting || email != null}
                                        >
                                            {field.state.value ? (
                                            usersData?.find((user) => user.email === field.state.value)?.email
                                            ) : (
                                            <span className="text-muted-foreground">
                                                {t("ui.loans.createLoan.placeholders.email")}
                                            </span>
                                            )}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                        <Command
                                            filter={(value, search) => {
                                            const user = usersData?.find((u) => u.email === value);
                                            return user?.email.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                                            }}
                                        >
                                            <CommandInput
                                            placeholder={t("ui.loans.createLoan.placeholders.searchEmail")}
                                            className="h-9"
                                            />
                                            <CommandList>
                                            <CommandEmpty>{t("ui.common.no_results")}</CommandEmpty>
                                            <CommandGroup>
                                                {usersData?.map((user) => (
                                                <CommandItem
                                                    key={user.email}
                                                    value={user.email}
                                                    onSelect={(currentValue) => {
                                                    field.handleChange(currentValue);
                                                    setOpen(false);

                                                    }}
                                                >
                                                    {user.email}
                                                    <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        field.state.value === user.email ? "opacity-100" : "opacity-0"
                                                    )}
                                                    />
                                                </CommandItem>
                                                ))}
                                            </CommandGroup>
                                            </CommandList>
                                        </Command>
                                        </PopoverContent>
                                    </Popover>
                                {/* <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t("ui.loans.createLoan.placeholders.email")}
                                    disabled={form.state.isSubmitting || email!=null}
                                    required={false}
                                    autoComplete="off"
                                /> */}
                                <FieldInfo field={field} />
                            </div>
                        )}
                        </form.Field>
                    </div>
                    <div className="mb-4">
                        <form.Field
                            name="isbn"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!value) {
                                        return t("ui.validation.required", {
                                            attribute: t("ui.loans.fields.isbn").toLowerCase(),
                                        });
                                    }
                                    if (!/^\d+$/.test(value)) {
                                        return t("ui.validation.numeric", {
                                          attribute: t("ui.books.columns.isbn").toLowerCase(),
                                        });
                                    }

                                    if (value.length !== 10 && value.length !== 13) {
                                        return t("ui.validation.length.isbn", {
                                          attribute: t("ui.books.columns.isbn").toLowerCase(),
                                        });
                                      }
                                    const isbnExists = allBooksISBN.some(book => book.isbn === value);
                                    if (!isbnExists) {
                                        return t("ui.validation.isbnLoan");
                                    }

                                    return undefined;
                                },
                            }}
                    >
                        {(field) => (
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                <Icon iconNode={Barcode} className="w-5 h-5" />
                                <Label htmlFor={field.name}>{t("ui.loans.fields.isbn")}</Label>
                                </div>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t("ui.loans.createLoan.placeholders.isbn")}
                                    disabled={form.state.isSubmitting || bookISBN!=null || isbn!=null }
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                        </form.Field>
                        </div>
                            <div className="mb-4">
                            <form.Field
                                    name="loan_duration"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            if ((value === null || value === undefined)) {
                                                return t("ui.validation.required", {
                                                    attribute: t("ui.loans.fields.loanDuration").toLowerCase(),
                                                });
                                            }
                                            if(value<0){
                                                return t("ui.validation.min.numeric", {
                                                    attribute: t("ui.loans.columns.loan_duration").toLowerCase()
                                                });

                                            }


                                            return undefined;

                                        },
                                    }}
                                >
                                    {(field) => (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                            <Icon iconNode={Clock} className="w-5 h-5" />
                                            <Label htmlFor={field.name}>{t("ui.loans.fields.loanDuration")}</Label>
                                            </div>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                                onBlur={field.handleBlur}
                                                placeholder={t("ui.loans.createLoan.placeholders.loanDuration")}
                                                disabled={form.state.isSubmitting}
                                                required={false}
                                                autoComplete="off"
                                            />
                                            <FieldInfo field={field} />
                                        </div>
                                    )}

                                </form.Field>
                            </div>
                    </div>


                </Card>
                <hr className="dark:border-black" />
                <div className="p-1 bg-gray-100 dark:bg-[#272726] "></div>
                 <div className="grid grid-cols-2 justify-items-end gap-4 bg-gray-100 dark:bg-[#272726]">
                    <Button
                    className="justify-self-start hover:bg-red-500 ml-4"
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = "/loans";
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }}
                        disabled={form.state.isSubmitting}
                    >
                        <Icon iconNode={X} className="w-5 h-5" />
                        {t("ui.loans.buttons.cancel")}
                    </Button>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                                <Icon iconNode={Save} className="w-5 h-5" />
                                {isSubmitting
                                    ? t("ui.loans.buttons.saving")
                                    : initialData
                                        ? t("ui.loans.buttons.update")
                                        : t("ui.loans.buttons.save")}
                            </Button>
                        )}

                    </form.Subscribe>
                </div>
                <div className="rounded-b-lg p-1 bg-gray-100 dark:bg-[#272726]"></div>
            </form>
        </div>
    );

}
