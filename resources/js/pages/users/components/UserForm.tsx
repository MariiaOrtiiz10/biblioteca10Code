//importaciones de shacdn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { User, Mail, Lock} from "lucide-react";
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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


//Datos que puede recibe el formulario(Esto sirve para editar usuario)
interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
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

export function UserForm({ initialData, page, perPage }: UserFormProps) {
    const { t } = useTranslations();//función que traduce los textos del form
    const queryClient = useQueryClient();//para actualizar caché

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            //valores por defecto
            name: initialData?.name ?? "", 
            email: initialData?.email ?? "",
            password: "",
            // pwd2: "",
        },
        //enviar formulario
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["users"] });

                    // Construct URL with page parameters
                    let url = "/users";
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
                                ? t("messages.users.error.update")
                                : t("messages.users.error.create")
                        );
                    }
                },
            };

            //PUT --> Para editar usuario; POST--> Para crear nuevo usuario
            if (initialData) {
                router.put(`/users/${initialData.id}`, value, options);
            } else {
                router.post("/users", value, options);
            }
        },
    });

     
    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };
    
    return (
        <div className="">
            <header className="">
            <div className="flex items-center gap-2">
            <Icon iconNode={User} className="w-6 h-6 text-blue-500" />
            <Label className="text-2xl font-black">{t("ui.createUser.Header.newUser")}</Label>
            <br></br>   
            </div>
            <p>{t("ui.createUser.Header.h2")}</p>
            </header>    
        <form onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
                <div>
                {/* Name field */}
                <form.Field
                    name="name"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            return !value
                                ? t("ui.validation.required", { attribute: t("ui.users.fields.name").toLowerCase() })
                                : value.length < 2
                                    ? t("ui.validation.min.string", { attribute: t("ui.users.fields.name").toLowerCase(), min: "2" })
                                    : undefined;
                        },
                    }}
                >
                    {(field) => (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                            <Icon iconNode={User} className="w-5 h-5" />
                            <Label htmlFor={field.name}>{t("ui.users.fields.name")}</Label>
                            </div>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.name")}
                                disabled={form.state.isSubmitting}
                                required={false}
                                autoComplete="off"
                            />
                            <FieldInfo field={field} />
                        </div>
                    )}
                </form.Field>
            </div>
            
            {/* Email field */}
            <div>
                <form.Field
                    name="email"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            return !value
                                ? t("ui.validation.required", { attribute: t("ui.users.fields.email").toLowerCase() })
                                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                    ? t("ui.validation.email", { attribute: t("ui.users.fields.email").toLowerCase() })
                                    : undefined;
                        },
                    }}
                >
                    {(field) => (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                            <Icon iconNode={Mail} className="w-5 h-5" />
                            <Label htmlFor={field.name}>{t("ui.users.fields.email")}</Label>
                            </div>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.email")}
                                disabled={form.state.isSubmitting}
                                required={false}
                                autoComplete="off"
                            />
                            <FieldInfo field={field} />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Password field */}
            <div>
                <form.Field
                    name="password"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            if (!initialData && (!value || value.length === 0)) {
                                return t("ui.validation.required", { attribute: t("ui.users.fields.password").toLowerCase() });
                            }
                            if (value && value.length > 0 && value.length < 8) {
                                return t("ui.validation.min.string", { attribute: t("ui.users.fields.password").toLowerCase(), min: "8" })+ ", " + t("ui.createUser.pwd");
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                            <Icon iconNode={Lock} className="w-5 h-5" />
                            <Label htmlFor={field.name}>
                                {initialData
                                    ? t("ui.users.fields.password_optional")
                                    : t("ui.users.fields.password")}
                            </Label>
                            </div>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.password")}
                                disabled={form.state.isSubmitting}
                                autoComplete="off"
                                required={false}
                            />
                            <FieldInfo field={field} />
                        </div>
                    )}
                </form.Field>
            </div>
            {/* <div>
                <form.Field
                    name="pwd2"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            if (!initialData && (!value || value.length === 0)) {
                                return t("ui.validation.required", { attribute: t("ui.users.fields.password").toLowerCase() });
                            }
                            if (value && value.length > 0 && value.length < 8) {
                                return t("ui.validation.min.string", { attribute: t("ui.users.fields.password").toLowerCase(), min: "8" })+ ", " + t("ui.stringsCreados.pwd");
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                            <Label htmlFor={field.name}>
                                {initialData
                                    ? t("ui.users.fields.password_optional")
                                    : t("ui.users.fields.password")}
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.password")}
                                disabled={form.state.isSubmitting}
                                autoComplete="off"
                                required={false}
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
            </div> */}

            {/* Form buttons */}
            <div className="grid grid-cols-2 justify-items-end gap-4"> {/* Por defecto al final a la derecha (2 columnas y 1 fila)*/}
                <Button
                className="justify-self-start hover:bg-red-500"
                    type="button"
                    variant="outline"
                    onClick={() => {
                        let url = "/users";
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
                    {t("ui.users.buttons.cancel")}
                </Button>

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button className="bg-blue-500" type="submit" disabled={!canSubmit} >
                            {isSubmitting
                                ? t("ui.users.buttons.saving")
                                : initialData
                                    ? t("ui.users.buttons.update")
                                    : t("ui.users.buttons.save")}
                        </Button>
                    )}
                </form.Subscribe>
            </div>
        </form>
</div>
    );
}
