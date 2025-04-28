import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Mail, Barcode} from "lucide-react";
import { Card } from "@/components/ui/card"
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";



interface ReservationFormProps {
    initialData?: {
        id: string;
        email:string;
        isbn:string;
    };
    usersEmail:{
        id:string;
        email:string;
    }[];
    page?: string;
    perPage?: string;
    bookISBN: string|null;
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

export function ReservationForm({initialData, page, perPage, bookISBN, usersEmail=[]}:ReservationFormProps){
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const form = useForm({
        defaultValues: {
            email: initialData?.email ?? '',
            isbn: initialData?.isbn ?? bookISBN ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["reservations"] });
                    // Construct URL with page parameters
                    let url = "/reservations";
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
                                ? t("messages.reservations.error.update")
                                : t("messages.reservations.error.create")
                        );
                    }
                },
            };
            if (initialData) {
                router.put(`/reservations/${initialData.id}`, value, options,);
            } else {
                router.post("/reservations", value, options);
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
                                    const emailExists = usersEmail.some(user => user.email === value);
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
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t("ui.loans.createLoan.placeholders.email")}
                                    disabled={form.state.isSubmitting}
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
                                    disabled={form.state.isSubmitting || bookISBN!=null}
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
                            let url = "/reservations";
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
                        {t("ui.reservations.buttons.cancel")}
                    </Button>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                                <Icon iconNode={Save} className="w-5 h-5" />
                                {isSubmitting
                                    ? t("ui.reservations.buttons.saving")
                                    : initialData
                                        ? t("ui.reservations.buttons.update")
                                        : t("ui.reservations.buttons.save")}
                            </Button>
                        )}

                    </form.Subscribe>
                </div>
                <div className="rounded-b-lg p-1 bg-gray-100 dark:bg-[#272726]"></div>
            </form>
        </div>
    );

}
