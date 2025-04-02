//importaciones de shacdn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { ScrollArea } from "@/components/ui/scroll-area"
import {X, Save, Building2} from "lucide-react";
import { Card } from "@/components/ui/card"
import{ Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
//Para invalidar y actualizar datos en caché después de un cambio
import { useQueryClient } from "@tanstack/react-query";
//Para la navegación y envío de formularios sin recargar la página
import { router } from "@inertiajs/react";
//Muestra notificaciones cunado ocurren errores o acciones exitosas
import { toast } from "sonner";
//traduccion
import { useTranslations } from "@/hooks/use-translations";
//logica form
import { useForm } from "@tanstack/react-form";
//tipo de datos para definir un campo en el form
import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";



interface FloorFormProps {
    initialData?: {
        id: string;
        floorNumber: number;
        floorName: string;
        zonesCapacity: number;
    };

    //paginación
    page?: string;
    perPage?: string;
    floorNumber?: number[];
    floorName?: string[];

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

export function FloorForm({initialData, page, perPage, floorNumber = [], floorName = []}:FloorFormProps){
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const form = useForm({
        defaultValues: {
         floorNumber: initialData?.floorNumber ?? undefined,
         floorName: initialData?.floorName ?? "",
         zonesCapacity: initialData?.zonesCapacity ?? undefined,

        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["floors"] });
                    // Construct URL with page parameters
                    let url = "/floors";
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
                                ? t("messages.floors.error.update")
                                : t("messages.floors.error.create")
                        );
                    }
                },
            };
            if (initialData) {
                router.put(`/floors/${initialData.id}`, value, options,);
            } else {
                router.post("/floors", value, options);
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
        <div className="rounded-lg shadow-md shadow-gray-400 dark:bg-[#272726]">
            <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
                <div className="flex items-center gap-2">
                    <Icon iconNode={Building2} className="w-6 h-6 text-blue-500" />
                    <Label className="text-2xl font-black">{t("ui.createFloor.Header.newFloor")}</Label>
                </div>
                <p className="text-gray-600">{t("ui.createFloor.Header.h2")}</p>
            </header>
            <hr className="dark:border-black "></hr>
            <div className="py-1 bg-gray-100 dark:bg-[#272726]"></div>
            <form onSubmit={handleSubmit} className="space-y-1  bg-gray-100 dark:bg-[#272726] " noValidate>
                <Card>
                    <div className="ml-5 mr-5">
                        <div className="mb-4">
                            <form.Field
                                name="floorName"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.floors.fields.floorName").toLowerCase(),
                                            });
                                        }
                                        if(floorName.includes(value) && (value!=initialData?.floorName)){
                                            return t("ui.validation.unique", {
                                                attribute: t("ui.floors.fields.floorName"),
                                            });

                                        }

                                        return undefined;
                                    },
                                }}
                        >
                            {(field) => (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                    <Icon iconNode={Building2} className="w-5 h-5" />
                                    <Label htmlFor={field.name}>{t("ui.floors.fields.floorName")}</Label>
                                    </div>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.floors.placeholders.floorName")}
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
                                name="floorNumber"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.floors.fields.floorNumber").toLowerCase(),
                                            });
                                        }
                                        if(floorNumber.includes(value) && (value!=initialData?.floorNumber)){
                                            return t("ui.validation.unique", {
                                                attribute: t("ui.floors.fields.floorNumber"),
                                            });

                                        }

                                        return undefined;

                                    },
                                }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={Building2} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t("ui.floors.fields.floorNumber")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.floors.placeholders.zonesCapacity")}
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
                                name="zonesCapacity"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.floors.fields.floorNumber").toLowerCase(),
                                            });
                                        }
                                        const numericValue = Number(value);
                                        if (isNaN(numericValue)) {
                                            return t("ui.validation.unique", {
                                                attribute: t("ui.floors.fields.floorName").toLowerCase(),
                                            });
                                        }

                                        return undefined;

                                    },
                                }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={Building2} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t("ui.floors.fields.zonesCapacity")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.floors.placeholders.zonesCapacity")}
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
                            let url = "/floors";
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
                        {t("ui.floors.buttons.cancel")}
                    </Button>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                                <Icon iconNode={Save} className="w-5 h-5" />
                                {isSubmitting
                                    ? t("ui.floors.buttons.saving")
                                    : initialData
                                        ? t("ui.floors.buttons.update")
                                        : t("ui.floors.buttons.save")}
                            </Button>
                        )}

                    </form.Subscribe>
                </div>
                <div className="rounded-b-lg p-1 bg-gray-100 dark:bg-[#272726]"></div>
            </form>
        </div>
      </div>
    );

}
