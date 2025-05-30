//importaciones de shacdn
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Barcode, Book as BookIcon, Bookmark, Building2, Image, Save, Signature, SquareLibrary, Tag, UserRoundPen, X } from 'lucide-react';
//Para invalidar y actualizar datos en caché después de un cambio
import { useQueryClient } from '@tanstack/react-query';
//Para la navegación y envío de formularios sin recargar la página
import { router } from '@inertiajs/react';
//Muestra notificaciones cunado ocurren errores o acciones exitosas
import { toast } from 'sonner';
//traduccion
import { useTranslations } from '@/hooks/use-translations';
//logica form
import { useForm } from '@tanstack/react-form';
//tipo de datos para definir un campo en el form
import { Book } from '@/hooks/books/useBooks';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useState } from 'react';

//Datos que puede recibe el formulario(Esto sirve para editar usuario)
interface BookFormProps {
    initialData?: {
        id: string;
        bookshelf_id: string;
        isbn: string;
        title: string;
        author: string;
        editorial: string;
        pages: number;
        genres: string;
        media?: any[];
    };
    genresData?: string[];
    genres: any[];
    zonesData: any[];
    floorsData: any[];
    bookshelvesData: any[];
    booksData?: any[];
    image_path?: string;

    //paginación
    page?: string;
    perPage?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

export function BookForm({
    initialData,
    page,
    perPage,
    genresData,
    genres,
    zonesData,
    floorsData,
    bookshelvesData,
    booksData,
    image_path,
}: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    let floorNow = undefined;
    let zoneNow = undefined;
    console.log(initialData);

    if (initialData) {
        const bookshelf = bookshelvesData.find((bs) => bs.id === initialData.bookshelf_id);
        const zone = bookshelf && zonesData.find((z) => z.id === bookshelf.zone_id);
        floorNow = zone?.floor_id;
        zoneNow = zone?.id;
    }

    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(floorNow ?? undefined);
    const [selectedZone, setSelectedZone] = useState<string | undefined>(zoneNow ?? undefined);
    const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);


    const [sameISBN, setSameISBN] = useState(false);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

    //Añadir al array el label
    const transformedGenres = genres.map((genre) => ({
        ...genre,
        label: genre.genre,
    }));

    //Para el genero de la zona
    const zoneGenreId = selectedZone ? zonesData.find((z) => z.id === selectedZone)?.genre_id : null;

    //Array de los genres
    const [selectedGenres, setSelectedGenres] = useState<string[]>(genresData || (zoneGenreId ? [zoneGenreId] : []));

    const handleGenreChange = (genreId: string) => {
        setSelectedGenres((prev) => {
            if (prev.includes(genreId)) {
                return prev.filter((id) => id !== genreId);
            } else {
                return [...prev, genreId];
            }
        });
    };
    const initialGenres = genresData?.length
    ? genresData
    : (initialData?.genres
        ?.split(', ')
        .map(name => {
            const genre = genres.find(g => g.genre === name.trim());
            return genre?.id;
        })
        .filter(Boolean) ?? []);

    function handleISBN(books: Book[], isbn: string) {
        let book = books.filter((book) => book.isbn === isbn);
        if (book.length > 0) {
            console.log('book', book);
            form.setFieldValue('title', book[0].title);
            form.setFieldValue('author', book[0].author);
            form.setFieldValue('editorial', book[0].editorial);
            form.setFieldValue('pages', book[0].pages);
            let genreNames = book[0].genres.split(', ');
            let genreIds = genres.filter((g) => genreNames.includes(g.genre)).map((g) => g.id);
            setSelectedGenres(genreIds);


            setSameISBN(true);

        }
    }

    const form = useForm({
        defaultValues: {
            isbn: initialData?.isbn ?? '',
            title: initialData?.title ?? '',
            pages: initialData?.pages ?? undefined,
            author: initialData?.author ?? '',
            editorial: initialData?.editorial ?? '',
            bookshelf_id: initialData?.bookshelf_id ?? '',
            genres: initialGenres,
            image: undefined,
        },
        onSubmit: async ({ value }) => {
            const formData = new FormData();
            formData.append('title', value.title);
            formData.append('isbn', value.isbn);
            formData.append('author', value.author);
            formData.append('editorial', value.editorial);
             formData.append('pages', String(value.pages));
            formData.append('bookshelf_id', value.bookshelf_id);
            if (selectedImage) {
                formData.append('files', selectedImage);
            }
            const selectedGenreNames = genres
            .filter(g => selectedGenres.includes(g.id))
            .map(g => g.genre);

            formData.append('genres', selectedGenreNames.join(', '));
            formData.append('_method', 'PUT');

            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['books'] });
                    // Construct URL with page parameters
                    let url = '/searchBooks';
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
                        toast.error(initialData ? t('messages.books.error.update') : t('messages.books.error.create'));
                    }
                },
            };
            if (initialData) {
                router.post(`/books/${initialData.id}`, formData, options);
            } else {
                router.post('/books', value, options);
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
        const genreNames = finalGenres.map((id) => genres.find((g) => g.id === id)?.genre).filter((name): name is string => !!name);
        form.setFieldValue('genres', genreNames.join(', '));
        form.handleSubmit();
    };
    console.log(initialData);

    return (
        <div className="">
            <hr className="dark:border-black"></hr>
            <div className="bg-gray-100 py-1 dark:bg-[#272726]"></div>
            <form onSubmit={handleSubmit} className="space-y-1 bg-gray-100 dark:bg-[#272726]" noValidate>
                <Tabs defaultValue="basicInformation" className="mr-3 ml-3">
                    <TabsList className="grid h-15 w-full grid-cols-2">
                        <TabsTrigger className="p-3 capitalize" value="basicInformation">
                            {t('ui.books.createBook.basicInformation')}
                        </TabsTrigger>
                        <TabsTrigger className="p-3" value="location">
                            {t('ui.books.createBook.location')}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="basicInformation">
                        <Card>
                            <div className="mr-5 ml-5">
                                <div className="mb-4">
                                    <form.Field
                                        name="isbn"
                                        validators={{
                                            onChangeAsync: async ({ value }) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                if (!value) {
                                                    return t('ui.validation.required', {
                                                        attribute: t('ui.books.fields.isbn').toLowerCase(),
                                                    });
                                                }

                                                if (!/^\d+$/.test(value)) {
                                                    return t('ui.validation.numeric', {
                                                        attribute: t('ui.books.columns.isbn').toLowerCase(),
                                                    });
                                                }

                                                if (value.length !== 10 && value.length !== 13) {
                                                    return t('ui.validation.length.isbn', {
                                                        attribute: t('ui.books.columns.isbn').toLowerCase(),
                                                    });
                                                }

                                                return undefined;
                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <div>
                                                <div className="mb-2 flex items-center gap-2">
                                                    <Icon iconNode={Barcode} className="h-5 w-5" />
                                                    <Label htmlFor={field.name}>{t('ui.books.fields.isbn')}</Label>
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
                                                    placeholder={t('ui.books.createBook.placeholders.isbn')}
                                                    disabled={form.state.isSubmitting}
                                                    required={false}
                                                    autoComplete="off"
                                                />
                                                <FieldInfo field={field} />
                                            </div>
                                        )}
                                    </form.Field>
                                </div>

                                <div className="mb-5 flex gap-3">
                                    <div className="flex-2">
                                        <form.Field
                                            name="title"
                                            validators={{
                                                onChangeAsync: async ({ value }) => {
                                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                                    if (!value) {
                                                        return t('ui.validation.required', {
                                                            attribute: t('ui.books.fields.title').toLowerCase(),
                                                        });
                                                    }
                                                    if (value.length < 2) {
                                                        return t('ui.validation.min.string', {
                                                            attribute: t('ui.books.columns.title').toLowerCase(),
                                                            min: '2',
                                                        });
                                                    }

                                                    return undefined;
                                                },
                                            }}
                                        >
                                            {(field) => (
                                                <div>
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <Icon iconNode={BookIcon} className="h-5 w-5" />
                                                        <Label htmlFor={field.name}>{t('ui.books.fields.title')}</Label>
                                                    </div>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        onBlur={field.handleBlur}
                                                        placeholder={t('ui.books.createBook.placeholders.title')}
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
                                                        return t('ui.validation.required', {
                                                            attribute: t('ui.books.fields.pages').toLowerCase(),
                                                        });
                                                    }
                                                    if (value < 0) {
                                                        return t('ui.validation.min.numeric', {
                                                            attribute: t('ui.books.columns.pages').toLowerCase(),
                                                        });
                                                    }
                                                    return undefined;
                                                },
                                            }}
                                        >
                                            {(field) => (
                                                <div>
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <Icon iconNode={BookIcon} className="h-5 w-5" />
                                                        <Label htmlFor={field.name}>{t('ui.books.fields.pages')}</Label>
                                                    </div>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type="number"
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                                        onBlur={field.handleBlur}
                                                        placeholder={t('ui.books.createBook.placeholders.pages')}
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

                                <div className="mb-5 flex gap-2">
                                    <div className="flex-1">
                                        <form.Field
                                            name="author"
                                            validators={{
                                                onChangeAsync: async ({ value }) => {
                                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                                    if (!value) {
                                                        return t('ui.validation.required', {
                                                            attribute: t('ui.books.fields.author').toLowerCase(),
                                                        });
                                                    }

                                                    return undefined;
                                                },
                                            }}
                                        >
                                            {(field) => (
                                                <div>
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <Icon iconNode={UserRoundPen} className="h-5 w-5" />
                                                        <Label htmlFor={field.name}>{t('ui.books.fields.author')}</Label>
                                                    </div>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        onBlur={field.handleBlur}
                                                        placeholder={t('ui.books.createBook.placeholders.author')}
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
                                                        return t('ui.validation.required', {
                                                            attribute: t('ui.books.fields.editorial').toLowerCase(),
                                                        });
                                                    }

                                                    return undefined;
                                                },
                                            }}
                                        >
                                            {(field) => (
                                                <div>
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <Icon iconNode={Signature} className="h-5 w-5" />
                                                        <Label htmlFor={field.name}>{t('ui.books.fields.editorial')}</Label>
                                                    </div>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        onBlur={field.handleBlur}
                                                        placeholder={t('ui.books.createBook.placeholders.editorial')}
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

                                <div className="mb-5">
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
                                            <div className="rounded-lg border border-gray-300 p-3">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <Icon iconNode={Tag} className="h-5 w-5" />
                                                    <Label>{t('ui.books.fields.genres')}</Label>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
                                                                    className={`h-4 w-4 rounded border-gray-300 transition-colors duration-200 ease-in-out ${isChecked ? 'bg-blue-600 checked:border-transparent' : ''} ${isDisabled ? '' : ''} `}
                                                                />
                                                                <label
                                                                    htmlFor={genre.id}
                                                                    className={`text-sm ${isDisabled ? 'font-medium text-gray-700' : ''}`}
                                                                >
                                                                    {t(`ui.genres.${genre.label}`)}
                                                                    {isDisabled && (
                                                                        <span className="ml-1 text-xs text-gray-500">
                                                                            ({t('ui.books.defaultGenre')})
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
                                <div>
                                    <form.Field
                                        name="image"
                                        validators={{
                                            onChangeAsync: async (value) => {
                                                await new Promise((resolve) => setTimeout(resolve, 500));
                                                return value.value == undefined && !image_path
                                                    ? t('ui.validation.required', { attribute: t('ui.books.fields.image').toLowerCase() })
                                                    : null;
                                            },
                                        }}
                                    >
                                        {(field) => (
                                            <div className="">
                                                <div className="mb-3 flex items-center gap-2">
                                                <Icon iconNode={Image} className="h-5 w-5" />
                                                <Label htmlFor={field.name}>{t('ui.books.fields.image')}</Label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <label
                                                        htmlFor={field.name}
                                                        className="relative cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:bg-gray-50"
                                                    >
                                                        <span className="font-medium text-gray-700">
                                                            {selectedImage
                                                                ? selectedImage.name
                                                                : image_path
                                                                  ? t("ui.books.changeImage")
                                                                  : t("ui.books.selectImage")}
                                                        </span>
                                                        <Input
                                                            id={field.name}
                                                            type="file"
                                                            name={field.name}
                                                            className="sr-only"

                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    setSelectedImage(file);
                                                                    field.handleChange(file);
                                                                }
                                                            }}
                                                            onBlur={field.handleBlur}
                                                            disabled={form.state.isSubmitting || sameISBN}
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="mt-2">
                                                    {selectedImage ? (
                                                        <img
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt="Nueva imagen"
                                                            className="h-40 rounded border object-contain"
                                                        />
                                                    ) : image_path ? (
                                                        <img src={image_path} alt="Imagen actual" className="h-40 rounded border object-contain" />
                                                    ) : null}
                                                </div>

                                                <FieldInfo field={field} />
                                            </div>
                                        )}
                                    </form.Field>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                    <TabsContent value="location">
                        <Card>
                            <div className="mr-5 ml-5">
                                <div className="mb-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Icon iconNode={Building2} className="h-5 w-5" />
                                        <Label>{t('ui.books.fields.floor')}</Label>
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
                                            <SelectValue placeholder={t('ui.books.createBook.placeholders.selectFloor')} />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {floorsData?.map((floor) => {
                                                const floorZones = zonesData.filter((zone) => zone.floor_id === floor.id);
                                                const floorBookshelves = bookshelvesData.filter((shelf) =>
                                                    floorZones.some((zone) => zone.id === shelf.zone_id),
                                                );
                                                const hasAvailableShelf = floorBookshelves.some((shelf) => shelf.occupiedBooks < shelf.booksCapacity);

                                                const isFull = floorZones.length === 0 || !hasAvailableShelf;
                                                const isCurrent = initialData && floor.id === floorNow;

                                                return (
                                                    <SelectItem
                                                        key={floor.id}
                                                        value={floor.id}
                                                        disabled={!isCurrent && isFull}
                                                        className={!isCurrent && isFull ? 'cursor-not-allowed opacity-75' : ''}
                                                    >
                                                        <div className="flex w-full items-center justify-between">
                                                            <span>
                                                                {t('ui.books.floor')}: {floor.floorNumber} / {t('ui.bookshelves.floorName')}:{' '}
                                                                {floor.floorName}
                                                            </span>
                                                            {isCurrent ? (
                                                                <span className="ml-2 text-sm text-blue-600">{t('ui.books.currentFloor')}</span>
                                                            ) : isFull ? (
                                                                <span className="ml-2 text-sm text-red-600">{t('ui.books.occupied')}</span>
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
                                    <div className="mb-2 flex items-center gap-2">
                                        <Icon iconNode={Bookmark} className="h-5 w-5" />
                                        <Label>{t('ui.books.fields.zone')}</Label>
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
                                                        (shelf) => shelf.zone_id === zone.id && shelf.occupiedBooks < shelf.booksCapacity,
                                                    );
                                                    const isFull = !hasAvailableShelf;
                                                    const isCurrent = initialData && zone.id === zoneNow;
                                                    return (
                                                        <SelectItem
                                                            key={zone.id}
                                                            value={zone.id}
                                                            disabled={!isCurrent && isFull}
                                                            className={!isCurrent && isFull ? 'cursor-not-allowed opacity-75' : ''}
                                                        >
                                                            <div className="flex w-full items-center justify-between">
                                                                <span>
                                                                    {t('ui.bookshelves.zone')}: {zone.zoneName} / {t('ui.bookshelves.genre')}:{' '}
                                                                    {t(`ui.genres.${zone.genre.genre}`)}
                                                                </span>
                                                                {isCurrent ? (
                                                                    <span className="ml-2 text-sm text-green-600">{t('ui.books.currentZone')}</span>
                                                                ) : isFull ? (
                                                                    <span className="ml-2 text-sm text-red-600">{t('ui.books.occupied')}</span>
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
                                                    return t('ui.validation.required', {
                                                        attribute: t('ui.bookshelves.fields.zone').toLowerCase(),
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
                                                <div className="mb-2 flex items-center gap-2">
                                                    <Icon iconNode={SquareLibrary} className="h-5 w-5" />
                                                    <Label htmlFor={field.name}>{t('ui.books.fields.bookshelf')}</Label>
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
                                                                        className={!isCurrent && isFull ? 'cursor-not-allowed opacity-75' : ''}
                                                                    >
                                                                        <div className="flex w-full items-center justify-between">
                                                                            <span>{shelf.bookshelfNumber}</span>
                                                                            {isCurrent ? (
                                                                                <span className="ml-2 text-sm text-amber-600">
                                                                                    {t('ui.books.currentBookshelf')}
                                                                                </span>
                                                                            ) : isFull ? (
                                                                                <span className="ml-2 text-sm text-red-600">
                                                                                    {t('ui.books.occupied')}
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

                <div className="bg-gray-100 p-1.5 dark:bg-[#272726]"></div>
                <hr className="dark:border-black" />
                <div className="bg-gray-100 p-1 dark:bg-[#272726]"></div>

                <div className="grid grid-cols-2 justify-items-end gap-4 bg-gray-100 dark:bg-[#272726]">
                    <Button
                        className="ml-4 justify-self-start hover:bg-red-500"
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/books';
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
                        <Icon iconNode={X} className="h-5 w-5" />
                        {t('ui.books.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button className="mr-4 bg-blue-500" type="submit" disabled={!canSubmit}>
                                <Icon iconNode={Save} className="h-5 w-5" />
                                {isSubmitting
                                    ? t('ui.books.buttons.saving')
                                    : initialData
                                      ? t('ui.books.buttons.update')
                                      : t('ui.books.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
                <div className="rounded-b-lg bg-gray-100 p-1 dark:bg-[#272726]"></div>
            </form>
        </div>
    );
}
