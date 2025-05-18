//importaciones de shacdn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {X, Save, Building2, CaseUpper, Tag, ChevronUp, ChevronsUpDown, Check} from "lucide-react";
import { Card } from "@/components/ui/card"
import{ Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
import { cn } from "@/lib/utils"


interface ZoneFormProps {
    initialData?: {
        id: string;
        zoneName:string;
        floor_id: string;
        genre_id:string;
        bookshelvesCapacity: number;
    };
    floorsData:any[];
    genresData:any[];
    zoneswithfloors:any[];

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

export function ZoneForm({initialData, page, perPage, floorsData, genresData, zoneswithfloors}:ZoneFormProps){
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const initialFloorId = initialData?.floor_id;
     const [open, setOpen] = useState(false)
    console.log(zoneswithfloors);


    const form = useForm({
        defaultValues: {
         zoneName: initialData?.zoneName ?? "",
         bookshelvesCapacity: initialData?.bookshelvesCapacity ?? undefined,
         floor_id: initialData?.floor_id ?? "",
         genre_id: initialData?.genre_id ?? "",
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["zones"] });
                    // Construct URL with page parameters
                    let url = "/zones";
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
                router.put(`/zones/${initialData.id}`, value, options,);
            } else {
                router.post("/zones", value, options);
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
                                        if(value.length < 3){
                                            return t("ui.validation.min.string", {
                                                attribute: t("ui.zones.columns.zoneName").toLowerCase(),
                                                min:"3",
                                            });
                                        }
                                        const selectedFloor = form.getFieldValue("floor_id");
                                       if (
                                        zoneswithfloors
                                            .filter(zone => zone.floor_id === selectedFloor)
                                            .some(zone =>
                                            zone.zoneName.trim().toLowerCase() === value.trim().toLowerCase() &&
                                            zone.id !== initialData?.id
                                            )
                                        ) {
                                        return t("ui.validation.unique", {
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
                                    <Icon iconNode={CaseUpper} className="w-5 h-5" />
                                    <Label htmlFor={field.name}>{t("ui.zones.fields.zoneName")}</Label>
                                    </div>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.zones.createZone.placeholders.zoneName")}
                                        disabled={form.state.isSubmitting}
                                        required={false}
                                        autoComplete="off"
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                            </form.Field>
                            </div>

                            <div className="mb-5">
                            <form.Field
                                name="floor_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.zones.fields.floorNumber").toLowerCase(),
                                            });
                                        }

                                        //Para editar si uno ya esta lleno cunado editas, ignora y deje editar.
                                        if (value === initialFloorId) {
                                            return undefined;
                                          }


                                        const selectedFloor = floorsData.find(floor => floor.id === value);
                                            if (selectedFloor && selectedFloor.zonesCapacity === selectedFloor.occupiedZones) {
                                                return t("ui.zones.validation.floorFull");
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
                                                <SelectValue placeholder={t("ui.zones.createZone.placeholders.selectFloor")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                            {floorsData?.map((floor) => {
                                                const isFull = floor.zonesCapacity === floor.occupiedZones;
                                                const isCurrentFloor = floor.id === initialFloorId;

                                                return (
                                                <SelectItem
                                                    key={floor.id}
                                                    value={floor.id}
                                                    disabled={isFull && !isCurrentFloor}
                                                    className={isFull && !isCurrentFloor ? "opacity-70 cursor-not-allowed" : ""}
                                                >
                                                    <div className="flex items-center justify-between w-full">
                                                    <span>
                                                        {t("ui.zones.createZone.floor")}: {floor.floorNumber}  /  {t("ui.zones.createZone.floorName")}: {floor.floorName}
                                                    </span>
                                                    {isCurrentFloor && (
                                                            <span className="ml-2 text-sm text-blue-600">{t("ui.zones.currentFloor")}</span>
                                                        )}
                                                        {isFull && !isCurrentFloor && (
                                                            <span className="ml-2 text-sm text-red-600">{t("ui.zones.occupied")}</span>
                                                        )}
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
                            <div className="mb-5">
                            <form.Field
                                name="genre_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!value) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.zones.fields.genre").toLowerCase(),
                                            });
                                        }
                                        return undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon iconNode={Tag} className="w-5 h-5" />
                                            <Label htmlFor={field.name}>{t("ui.zones.fields.genre")}</Label>
                                        </div>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                                >
                                                {
                                                   field.state.value ? (
                                                    t(`ui.genres.${genresData?.find((genre) => genre.id === field.state.value)?.genre}`)
                                                    ) : (
                                                    <span className="text-muted-foreground">
                                                        {t("ui.zones.createZone.placeholders.selectGenre")}
                                                    </span>
                                                    )
                                                }
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                                <Command
                                                filter={(value, search) => {
                                                    const genreName = genresData.find((g) => g.id === value)?.genre || "";
                                                    const translated = t(`ui.genres.${genreName}`);
                                                    return translated.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                                                }}
                                                >
                                                <CommandInput
                                                    placeholder={t("ui.zones.createZone.placeholders.searchGenre")}
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty className="px-4 py-2 text-sm text-muted-foreground">{t("ui.common.no_results")}</CommandEmpty>
                                                    <CommandGroup>
                                                    {genresData?.map((genre) => (
                                                        <CommandItem
                                                        key={genre.id}
                                                        value={genre.id}
                                                        onSelect={(currentValue) => {
                                                            field.handleChange(currentValue);
                                                            setOpen(false);
                                                        }}
                                                        >
                                                        {t(`ui.genres.${genre.genre}`)}
                                                        <Check
                                                            className={cn(
                                                            "ml-auto h-4 w-4",
                                                            field.state.value === genre.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        </CommandItem>
                                                    ))}
                                                    </CommandGroup>
                                                </CommandList>
                                                </Command>
                                            </PopoverContent>
                                            </Popover>



                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            </form.Field>
                            </div>
                            <div>
                            </div>

                            <div className="mb-5">
                            <form.Field
                                name="bookshelvesCapacity"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (value === null || value === undefined) {
                                            return t("ui.validation.required", {
                                                attribute: t("ui.zones.fields.bookshelvesCapacity").toLowerCase(),
                                            });
                                        }
                                        if(value<0){
                                            return t("ui.validation.min.numeric", {
                                                attribute: t("ui.zones.columns.bookshelvesCapacity").toLowerCase()
                                            });

                                        }

                                        const currentZone = zoneswithfloors.find(zone => zone.id === initialData?.id);
                                        if (currentZone && value < currentZone.occupiedBookshelves) {
                                            return t("ui.validation.capacity.zone", {
                                                attribute: t("ui.zones.columns.occupiedBookshelves").toLowerCase(),
                                                occupiedBookshelves: currentZone.occupiedBookshelves.toString(),
                                            });
                                        }

                                        return undefined;

                                    },
                                }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={ChevronUp} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t("ui.zones.fields.bookshelvesCapacity")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.zones.createZone.placeholders.bookshelvesCapacity")}
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
    );

}
