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


interface BookshelfFormProps {
    initialData?: {
        id: string;
        bookshelfNumber:number;
        zone_id: string;
        booksCapacity: number;
    };
    floorsData?: {
        id:string;
        floorNumber:number;
        zonesCapacity: number;
        occupiedZones: number;
    }[];
    zonesData?:{
        id: string;
        zoneName: string;
        floor_id:string;
        bookshelvesCapacity:number;
        occupiedBookshelves:number;
    }[];
    //paginación
    page?: string;
    perPage?: string;
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

export function BookshelfForm({initialData, page, perPage, floorsData=[],  zonesData=[]}:BookshelfFormProps){
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    console.log('floorsData', floorsData);
    console.log('zonesData', zonesData);

    let floorNow = undefined;

    if (initialData) {
        floorNow = zonesData.filter((zones) => zones.id === initialData?.zone_id)[0].floor_id;
    }

    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(floorNow ?? undefined);




    const form = useForm({
        defaultValues: {
            bookshelfNumber: initialData?.bookshelfNumber ?? undefined,
            zone_id: initialData?.zone_id ?? '',
            booksCapacity: initialData?.booksCapacity ?? undefined,

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

    function checkFloor() {
        let check;
        if (selectedFloor == undefined) {
            check = true;
        } else {
            check = false;
        }
        return check;
    }

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
                    <div className="mb-5">
                        <form.Field
                            name="bookshelfNumber"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!value) {
                                        return t("ui.validation.required", {
                                            attribute: t("ui.bookshelves.fields.bookshelfNumber").toLowerCase(),
                                        });
                                    }
                                    if(value<0){
                                        return t("ui.validation.min.numeric", {
                                            attribute: t("ui.bookshelves.columns.bookshelfNumber").toLowerCase()
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
                                    <Label htmlFor={field.name}>{t("ui.bookshelves.fields.bookshelfNumber")}</Label>
                                    </div>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.bookshelves.createBookshelf.placeholders.bookshelfNumber")}
                                        disabled={form.state.isSubmitting}
                                        required={false}
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        </form.Field>
                    </div>
                    <div className="flex gap-4 mb-5">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                        <Icon iconNode={Building2} className="w-5 h-5" />
                        <Label>{t("ui.bookshelves.fields.floor")}</Label>
                        </div>

                        {/* select de floor */}

                        <Select
                        required={true}
                        value={selectedFloor}
                        onValueChange={(value) => {
                            setSelectedFloor(value);
                        }}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder={t("ui.bookshelves.createBookshelf.placeholders.selectFloor")} />
                        </SelectTrigger>
                        <SelectContent>
                            {floorsData?.map((floor) => {
                             const hasZones = zonesData.some(zone => zone.floor_id === floor.id);
                             const isFull = !hasZones || (
                               floor.zonesCapacity === floor.occupiedZones &&
                               zonesData.some(zone => zone.floor_id === floor.id && zone.occupiedBookshelves >= zone.bookshelvesCapacity)
                             );
                            const isCurrent = initialData && floor.id === floorNow;

                            return (
                                <SelectItem
                                key={floor.id}
                                value={floor.id}
                                disabled={!isCurrent && isFull}
                                className={!isCurrent && isFull ? "opacity-75 cursor-not-allowed" : ""}
                                >
                                <div className="flex items-center justify-between w-full">
                                    <span>
                                    {t("ui.bookshelves.floor")}: {floor.floorNumber}
                                    </span>
                                    {isCurrent ? (
                                    <span className="ml-2 text-sm text-blue-600">
                                        {t("ui.bookshelves.currentFloor")}
                                    </span>
                                    ) : isFull ? (
                                    <span className="ml-2 text-sm text-red-600">
                                        {t("ui.bookshelves.occupied")}
                                    </span>
                                    ) : null}
                                </div>
                                </SelectItem>
                            );
                            })}
                        </SelectContent>
                        </Select>
                    </div>

                    <div className="flex-1">
                        <form.Field
                        name="zone_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            if (!value) {
                                return t("ui.validation.required", {
                                attribute: t("ui.bookshelves.fields.zone").toLowerCase(),
                                });
                            }
                            if (initialData && value === initialData.zone_id) {
                                return undefined;
                              }

                              const selectedZone = zonesData.find((zone) => zone.id === value);
                              if (selectedZone && selectedZone.occupiedBookshelves >= selectedZone.bookshelvesCapacity) {
                                return t("ui.bookshelves.occupied");
                              }

                            return undefined;
                            },
                        }}
                        >
                        {(field) => (
                            <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Icon iconNode={Building2} className="w-5 h-5" />
                                <Label htmlFor={field.name}>{t("ui.bookshelves.fields.zone")}</Label>
                            </div>
                            <Select
                                name={field.name}
                                value={field.state.value}
                                onValueChange={(value) => {
                                field.handleChange(value);
                                console.log(value);
                                }}
                                required={true}
                                disabled={checkFloor()}
                            >
                                <SelectTrigger>
                                <SelectValue placeholder={t('ui.bookshelves.createBookshelf.placeholders.selectZone')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {zonesData
                                        .filter((zone) => zone.floor_id === selectedFloor)
                                        .map((zone) => {
                                        const isFull = zone.occupiedBookshelves >= zone.bookshelvesCapacity ;
                                        const isCurrent = initialData && zone.id === initialData.zone_id;

                                        return (
                                            <SelectItem
                                            key={zone.id}
                                            value={zone.id}
                                            disabled={!isCurrent && isFull}
                                            className={!isCurrent && isFull ? "opacity-75 cursor-not-allowed" : ""}
                                            >
                                            <div className="flex items-center justify-between w-full">
                                                <span>{zone.zoneName}</span>
                                                {isCurrent ? (
                                                <span className="ml-2 text-sm text-green-600">
                                                    {t("ui.bookshelves.currentZone")}
                                                </span>
                                                ) : isFull ? (
                                                <span className="ml-2 text-sm text-red-600">
                                                    {t("ui.bookshelves.occupied")}
                                                </span>
                                                ) : null}
                                            </div>
                                            </SelectItem>
                                        );
                                        })}
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
                            name="booksCapacity"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    if (!value) {
                                        return t("ui.validation.required", {
                                            attribute: t("ui.bookshelves.fields.bookshelvesCapacity").toLowerCase(),
                                        });
                                    }
                                    if(value<0){
                                        return t("ui.validation.min.numeric", {
                                            attribute: t("ui.bookshelves.columns.bookshelvesCapacity").toLowerCase()
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
                                    <Label htmlFor={field.name}>{t("ui.bookshelves.fields.bookshelvesCapacity")}</Label>
                                    </div>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.bookshelves.createBookshelf.placeholders.bookshelvesCapacity")}
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
                            let url = "/bookshelves";
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
                        {t("ui.bookshelves.buttons.cancel")}
                    </Button>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                                <Icon iconNode={Save} className="w-5 h-5" />
                                {isSubmitting
                                    ? t("ui.bookshelves.buttons.saving")
                                    : initialData
                                        ? t("ui.bookshelves.buttons.update")
                                        : t("ui.bookshelves.buttons.save")}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
                <div className="rounded-b-lg p-1 bg-gray-100 dark:bg-[#272726]"></div>
            </form>
      </div>
    );

}
