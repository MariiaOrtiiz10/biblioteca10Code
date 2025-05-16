//importaciones de shacdn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Lock, X, Eye, Save, Shield, Users,  Barcode, FileText, Signature, UserRoundPen, Building2, Bookmark, SquareLibrary, Book as BookIcon} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Book } from '@/hooks/books/useBooks';




//Datos que puede recibe el formulario(Esto sirve para editar usuario)
interface BookFormProps {
    initialData?: {
        id: string;
        bookshelf_id:string;
        isbn: string;
        title: string;
        author:string;
        editorial:string;
        pages:number;
        genres:string;
    };
    genresData?: string[];
    genres: any[];
    zonesData:any[];
    floorsData:any[];
    bookshelvesData:any[];

    booksData?:any[];


    //paginación
    page?: string;
    perPage?: string;
}


// Field error display component
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




export function BookForm({ initialData, page, perPage, genresData, genres, zonesData, floorsData, bookshelvesData, booksData}: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    let floorNow = undefined;
    let zoneNow = undefined;
    //console.log(initialData);


    if (initialData) {
        const bookshelf = bookshelvesData.find((bs) => bs.id === initialData.bookshelf_id);
        const zone = bookshelf && zonesData.find((z) => z.id === bookshelf.zone_id);
        floorNow = zone?.floor_id;
        zoneNow = zone?.id;
      }

      const [selectedFloor, setSelectedFloor] = useState<string | undefined>(floorNow ?? undefined);
      const [selectedZone, setSelectedZone] = useState<string | undefined>(zoneNow ?? undefined);
      const [sameISBN, setSameISBN] = useState(false);

      //Añadir al array el label
      const transformedGenres = genres.map((genre) => ({
        ...genre,
        label: genre.genre ,
    }));

    //Para el genero de la zona
    const zoneGenreId = selectedZone
    ? zonesData.find((z) => z.id === selectedZone)?.genre_id
    : null;

    //Array de los genres
    const [selectedGenres, setSelectedGenres] = useState<string[]>(
        genresData || (zoneGenreId ? [zoneGenreId] : [])
    );

    const handleGenreChange = (genreId: string) => {
        setSelectedGenres((prev) => {
            if (prev.includes(genreId)) {
                return prev.filter((id) => id !== genreId);
            } else {
                return [...prev, genreId];
            }
        });
    };
    const initialGenres = genresData?.length ? genresData.join(",") : initialData?.genres ?? '';

   function handleISBN(books: Book[], isbn: string) {
        let book = books.filter((book) => book.isbn === isbn);
        if (book.length > 0) {
            console.log(book);
                form.setFieldValue('title', book[0].title);
                form.setFieldValue('author', book[0].author);
                form.setFieldValue('editorial', book[0].editorial);
                form.setFieldValue('pages', book[0].pages);
                let genreNames = book[0].genres.split(', ');
                let genreIds = genres
                .filter((g) => genreNames.includes(g.genre))
                .map((g) => g.id);
                setSelectedGenres(genreIds);
                setSameISBN(true);
        }
    }



 const form = useForm({
        defaultValues: {
            isbn: initialData?.isbn ?? "",
            title:initialData?.title ?? "",
            pages: initialData?.pages ?? undefined,
            author:initialData?.author ?? "",
            editorial:initialData?.editorial ?? "",
            bookshelf_id: initialData?.bookshelf_id ?? '',
            genres: initialGenres,
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["books"] });
                    // Construct URL with page parameters
                    let url = "/books";
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
                                ? t("messages.books.error.update")
                                : t("messages.books.error.create")
                        );
                    }
                },
            };
            if (initialData) {
                router.put(`/books/${initialData.id}`, value, options,);
            } else {
                router.post("/books", value, options);
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


    function checkZone() {
        let check;
        if (selectedZone == undefined) {
            check = true;
        } else {
            check = false;
        }
        return check;
    }


    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const finalGenres = [...new Set([...selectedGenres, zoneGenreId])];
        const genreNames = finalGenres
        .map((id) => genres.find((g) => g.id === id)?.genre)
        .filter((name): name is string => !!name);
        form.setFieldValue('genres', genreNames.join(', '));
        form.handleSubmit();
    };



    return (
        <div className="">
            <hr className="dark:border-black "></hr>
             <div className="py-1 bg-gray-100 dark:bg-[#272726]"></div>
            <form onSubmit={handleSubmit} className="space-y-1  bg-gray-100 dark:bg-[#272726] " noValidate>
            <Tabs defaultValue="basicInformation" className="mr-3 ml-3">
                <TabsList className="grid w-full h-15 grid-cols-2 ">
                    <TabsTrigger className="capitalize p-3 " value="basicInformation">{t("ui.books.createBook.basicInformation")}</TabsTrigger>
                    <TabsTrigger className="p-3" value="location">{t("ui.books.createBook.location")}</TabsTrigger>
                </TabsList>
                <TabsContent value="basicInformation">
                    <Card>
                        <div className="ml-5 mr-5">
                            <div className="mb-4">
                                <form.Field
                                    name="isbn"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            if (!value) {
                                                return t("ui.validation.required", {
                                                    attribute: t("ui.books.fields.isbn").toLowerCase(),
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

                                            return undefined;
                                        },
                                    }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={Barcode} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t("ui.books.fields.isbn")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => {
                                            field.handleChange(e.target.value);
                                            const value = e.target.value;

                                            if ((value.length === 13 || value.length === 10) && booksData) {
                                                handleISBN(booksData, value);
                                            }
                                            }}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.books.createBook.placeholders.isbn")}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                                </form.Field>
                                </div>

                                <div className="flex gap-3 mb-5">
                                <div className="flex-2">
                                <form.Field
                                    name="title"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            if (!value) {
                                                return t("ui.validation.required", {
                                                    attribute: t("ui.books.fields.title").toLowerCase(),
                                                });
                                            }
                                            if (value.length < 2) {
                                                return t("ui.validation.min.string", {
                                                  attribute: t("ui.books.columns.title").toLowerCase(),
                                                  min: "2",
                                                });
                                              }

                                            return undefined;
                                        },
                                    }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={BookIcon} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t("ui.books.fields.title")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.books.createBook.placeholders.title")}
                                            disabled={form.state.isSubmitting || sameISBN}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                                </form.Field>

                                </div>
                                <div className="flex-1">
                                     <form.Field
                                        name="pages"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                if (!value) {
                                                    return t("ui.validation.required", {
                                                        attribute: t("ui.books.fields.pages").toLowerCase(),
                                                    });
                                                }
                                                if(value<0){
                                                    return t("ui.validation.min.numeric", {
                                                        attribute: t("ui.books.columns.pages").toLowerCase()
                                                    });
                                                }
                                                return undefined;

                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                <Icon iconNode={BookIcon} className="w-5 h-5" />
                                                <Label htmlFor={field.name}>{t("ui.books.fields.pages")}</Label>
                                                </div>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="number"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t("ui.books.createBook.placeholders.pages")}
                                                    disabled={form.state.isSubmitting|| sameISBN}
                                                    required={false}
                                                    autoComplete="off"
                                                />
                                                <FieldInfo field={field} />
                                            </div>
                                        )}
                                    </form.Field>
                                </div>
                                </div>

                                <div className="flex gap-2 mb-5">
                                <div className="flex-1">
                                <form.Field
                                    name="author"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            if (!value) {
                                                return t("ui.validation.required", {
                                                    attribute: t("ui.books.fields.author").toLowerCase(),
                                                });
                                            }

                                            return undefined;
                                        },
                                    }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={UserRoundPen} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t("ui.books.fields.author")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.books.createBook.placeholders.author")}
                                            disabled={form.state.isSubmitting || sameISBN}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                                </form.Field>
                                </div>

                                <div className="flex-1">

                                <form.Field
                                    name="editorial"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            if (!value) {
                                                return t("ui.validation.required", {
                                                    attribute: t("ui.books.fields.editorial").toLowerCase(),
                                                });
                                            }

                                            return undefined;
                                        },
                                    }}
                            >
                                {(field) => (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                        <Icon iconNode={Signature} className="w-5 h-5" />
                                        <Label htmlFor={field.name}>{t("ui.books.fields.editorial")}</Label>
                                        </div>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t("ui.books.createBook.placeholders.editorial")}
                                            disabled={form.state.isSubmitting || sameISBN}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                                </form.Field>
                                </div>
                            </div>

                            <div className="">
                            <form.Field
                            name="genres"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <div className="border border-gray-300 rounded-lg p-3">
                                    <div className="mb-4 ">
                                    <Label>{t("ui.books.fields.genres")}</Label>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {transformedGenres.map((genre) => {
                                        const isChecked = selectedGenres.includes(genre.id);
                                        const isDisabled = genre.id === zoneGenreId;

                                        return (
                                            <div key={genre.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={genre.id}
                                                checked={isChecked}
                                                disabled={isDisabled || sameISBN}
                                                onChange={() => handleGenreChange(genre.id)}
                                                className={`
                                                w-4 h-4 rounded border-gray-300
                                                transition-colors duration-200 ease-in-out
                                                ${isChecked ? "bg-blue-600 checked:border-transparent" : ""}
                                                ${isDisabled ? "" : ""}
                                                `}
                                            />
                                            <label
                                                htmlFor={genre.id}
                                                className={`text-sm ${
                                                isDisabled ? "text-gray-700 font-medium" : ""
                                                }`}
                                            >
                                                {t(`ui.genres.${genre.label}`)}
                                                {isDisabled && (
                                                <span className="ml-1 text-xs text-gray-500">
                                                    ({t("ui.books.defaultGenre")})
                                                </span>
                                                )}
                                            </label>
                                            </div>
                                        );
                                        })}
                                    </div>
                                </div>
                            )}
                        </form.Field>

                            </div>

                         </div>
                    </Card>
                 </TabsContent>
                <TabsContent value="location">
                    <Card>
                    <div className="ml-5 mr-5">
                        <div className="mb-4">
                             <div className="flex items-center gap-2 mb-2">
                                <Icon iconNode={Building2} className="w-5 h-5" />
                                <Label>{t("ui.books.fields.floor")}</Label>
                            </div>
                            {/* SELECT DE FLOOR */}
                                <Select
                                required={true}
                                value={selectedFloor}
                                onValueChange={(value) => {
                                setSelectedFloor(value);
                                setSelectedZone(undefined);
                                }}
                                >
                                <SelectTrigger>
                                    <SelectValue placeholder={t("ui.books.createBook.placeholders.selectFloor")} />
                                </SelectTrigger>

                                <SelectContent>
                                    {floorsData?.map((floor) => {
                                        const floorZones = zonesData.filter(zone => zone.floor_id === floor.id);
                                        const floorBookshelves =  bookshelvesData.filter((shelf) =>
                                            floorZones.some((zone) => zone.id === shelf.zone_id)
                                          );
                                        const hasAvailableShelf = floorBookshelves.some(
                                            (shelf) => shelf.occupiedBooks < shelf.booksCapacity
                                          );


                                        const isFull = floorZones.length === 0 || !hasAvailableShelf;
                                        const isCurrent = initialData && floor.id === floorNow ;

                                        return (
                                        <SelectItem
                                            key={floor.id}
                                            value={floor.id}
                                            disabled={!isCurrent && isFull}
                                            className={!isCurrent && isFull ? "opacity-75 cursor-not-allowed" : ""}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                            <span>
                                                {t("ui.books.floor")}: {floor.floorNumber} {/* /  {t("ui.zones.createZone.floorName")}: {floor.floorName} */}
                                            </span>
                                            {isCurrent ? (
                                                <span className="ml-2 text-sm text-blue-600">
                                                {t("ui.books.currentFloor")}
                                                </span>
                                            ) : isFull ? (
                                                <span className="ml-2 text-sm text-red-600">
                                                {t("ui.books.occupied")}
                                                </span>
                                            ) : null}
                                            </div>
                                        </SelectItem>
                                        );
                                    })}
                                    </SelectContent>
                                </Select>
                        </div>

                        <div className="mb-4">
                            {/* SELECT DE ZONE */}
                             <div className="flex items-center gap-2 mb-2">
                                <Icon iconNode={Bookmark} className="w-5 h-5" />
                                <Label>{t("ui.books.fields.zone")}</Label>
                            </div>
                            <Select
                            required={true}
                            value={selectedZone}
                            onValueChange={(value) => {
                            setSelectedZone(value);


                            }}
                            disabled={checkFloor()}

                            >
                                <SelectTrigger>
                                <SelectValue placeholder={t('ui.books.createBook.placeholders.selectZone')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {zonesData
                                    .filter((zone) => zone.floor_id === selectedFloor)
                                    .map((zone) => {
                                        const hasAvailableShelf = bookshelvesData.some(
                                        shelf => shelf.zone_id === zone.id && shelf.occupiedBooks < shelf.booksCapacity
                                        );
                                        const isFull = !hasAvailableShelf;
                                        const isCurrent = initialData && zone.id === zoneNow;
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
                                                {t("ui.books.currentZone")}
                                                </span>
                                            ) : isFull ? (
                                                <span className="ml-2 text-sm text-red-600">
                                                {t("ui.books.occupied")}
                                                </span>
                                            ) : null}
                                            </div>
                                        </SelectItem>
                                        );
                                    })}
                                    </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <form.Field
                            name="bookshelf_id"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                if (!value) {
                                    return t("ui.validation.required", {
                                    attribute: t("ui.bookshelves.fields.zone").toLowerCase(),
                                    });
                                }
                                if (initialData && value === initialData.bookshelf_id) {
                                    return undefined;
                                    }

                                return undefined;
                                },
                            }}
                            >
                            {(field) => (
                                <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon iconNode={SquareLibrary} className="w-5 h-5" />
                                    <Label htmlFor={field.name}>{t("ui.books.fields.bookshelf")}</Label>
                                </div>
                                <Select
                                    name={field.name}
                                    value={field.state.value}
                                    onValueChange={(value) => {
                                    field.handleChange(value);
                                    console.log(value);
                                    }}
                                    required={true}
                                    disabled={checkZone()}
                                >
                                    <SelectTrigger>
                                    <SelectValue placeholder={t('ui.books.createBook.placeholders.selectBookshelf')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bookshelvesData
                                            .filter((shelf) => shelf.zone_id === selectedZone)
                                            .map((shelf) => {
                                            const isFull = shelf.occupiedBooks >= shelf.booksCapacity;
                                            const isCurrent = initialData && shelf.id === initialData.bookshelf_id;

                                            return (
                                                <SelectItem
                                                key={shelf.id}
                                                value={shelf.id}
                                                disabled={!isCurrent && isFull}
                                                className={!isCurrent && isFull ? "opacity-75 cursor-not-allowed" : ""}
                                                >
                                                <div className="flex items-center justify-between w-full">
                                                    <span>{shelf.bookshelfNumber}</span>
                                                    {isCurrent ? (
                                                    <span className="ml-2 text-sm text-amber-600">
                                                        {t("ui.books.currentBookshelf")}
                                                    </span>
                                                    ) : isFull ? (
                                                    <span className="ml-2 text-sm text-red-600">
                                                        {t("ui.books.occupied")}
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


                    </Card>
                </TabsContent>
            </Tabs>

            <div className="p-1.5 bg-gray-100 dark:bg-[#272726]"></div>
            <hr className="dark:border-black" />
        <div className="p-1 bg-gray-100 dark:bg-[#272726] "></div>

        <div className="grid grid-cols-2 justify-items-end gap-4 bg-gray-100 dark:bg-[#272726]">
                <Button
                className="justify-self-start hover:bg-red-500 ml-4"
                    type="button"
                    variant="outline"
                    onClick={() => {
                        let url = "/books";
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
                    {t("ui.books.buttons.cancel")}
                </Button>

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                            <Icon iconNode={Save} className="w-5 h-5" />
                            {isSubmitting
                                ? t("ui.books.buttons.saving")
                                : initialData
                                    ? t("ui.books.buttons.update")
                                    : t("ui.books.buttons.save")}
                        </Button>
                    )}

                </form.Subscribe>
            </div>
            <div className="rounded-b-lg p-1 bg-gray-100 dark:bg-[#272726]"></div>
            </form>
    </div>
    );
}
