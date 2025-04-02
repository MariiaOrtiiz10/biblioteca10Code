//importaciones de shacdn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
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


interface ZoneFormProps {
    initialData?: {
        id: string;
        zoneName:string;
        //floorNumber: number;
        //genre:string;
        bookshelvesCapacity: number;
    };
    floorsData?:{
        id: string;
        floorNumber: number;
    }[];
    //paginación
    page?: string;
    perPage?: string;
    floorNumber?: number[];
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

export function ZoneForm({initialData, page, perPage, floorsData}:ZoneFormProps){
    const { t } = useTranslations();
    const queryClient = useQueryClient();


    console.log(floorsData);
    const form = useForm({
        defaultValues: {
         zoneName: initialData?.zoneName ?? "",
         bookshelvesCapacity: initialData?.bookshelvesCapacity ?? undefined,
         selectFloorNumber: floorsData?.[0]?.floorNumber ?? "",
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["bookshelves"] });
                    // Construct URL with page parameters
                    let url = "/bookshelves";
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
                                ? t("messages.bookshelves.error.update")
                                : t("messages.bookshelves.error.create")
                        );
                    }
                },
            };
            if (initialData) {
                router.put(`/bookshelves/${initialData.id}`, value, options,);
            } else {
                router.post("/bookshelves", value, options);
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
                        <div className="mb-5">
                            <form.Field
                                name="zoneName"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.zones.fields.zoneName").toLowerCase(),
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
                                    <Label htmlFor={field.name}>{t("ui.zones.fields.zoneName")}</Label>
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

                            <div className="mb-5">
                            <form.Field
                                name="selectFloorNumber"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.zones.fields.floorNumber").toLowerCase(),
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
                                            <Label htmlFor={field.name}>{t("ui.zones.fields.floorNumber")}</Label>
                                        </div>
                                        <Select
                                            required={true}
                                            value={field.state.value?.toString()}
                                            onValueChange={(value) => field.handleChange(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t("ui.zones.selectPlaceholder")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {floorsData?.map((floor) => (
                                                <SelectItem key={floor.id} value={floor.floorNumber.toString()}>
                                                    Piso: {floor.floorNumber}
                                                </SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            </form.Field>
                            </div>

                        </div>
                            <div className="mb-5">
                            <form.Field
                                name="bookshelvesCapacity"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.zones.fields.bookshelvesCapacity").toLowerCase(),
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
                                        <Label htmlFor={field.name}>{t("ui.zones.fields.bookshelvesCapacity")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.zones.placeholders.bookshelvesCapacity")}
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
                            let url = "/zones";
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
                        {t("ui.zones.buttons.cancel")}
                    </Button>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                                <Icon iconNode={Save} className="w-5 h-5" />
                                {isSubmitting
                                    ? t("ui.zones.buttons.saving")
                                    : initialData
                                        ? t("ui.zones.buttons.update")
                                        : t("ui.zones.buttons.save")}
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
