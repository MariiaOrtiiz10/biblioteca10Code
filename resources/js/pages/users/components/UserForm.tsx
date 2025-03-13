//importaciones de shacdn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import {} from "@/components/ui/checkbox";
import { User, Mail, Lock, X, Eye, Save, Shield, Users,  PackageOpen, FileText, Settings} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";


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
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? "", 
            email: initialData?.email ?? "",
            password: "",
            role: "",
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
            <div className="rounded-lg shadow-md shadow-gray-400">
            <header className="rounded-t-lg bg-gray-100 px-5 py-4 dark:bg-[#272726]">
            <div className="flex items-center gap-2">
            <Icon iconNode={User} className="w-6 h-6 text-blue-500" />
            <Label className="text-2xl font-black">{t("ui.createUser.Header.newUser")}</Label>        
            </div>
            <p className="text-gray-600">{t("ui.createUser.Header.h2")}</p>
            </header> 

           
            <hr></hr>
            <div className="p-2"></div>  
            <Tabs defaultValue="basicInformation" className="mr-3 ml-3">
                <TabsList className="grid w-full h-15 grid-cols-2">
                    <TabsTrigger className="capitalize p-3 " value="basicInformation">{t("ui.createUser.Tab.basicInformation.title")}</TabsTrigger>
                    <TabsTrigger className="p-3" value="rp">{t("ui.createUser.Tab.roles_permission.title")}</TabsTrigger>
                </TabsList>
                <TabsContent value="basicInformation">
                    <Card>
                        <div className="ml-5 mr-5">
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
                                <div className="">
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
                                <div className="">
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
                                <div className="">
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
                                                <div className="relative">
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
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    <Icon iconNode={Eye} className="w-5 h-5" />
                                                </div>
                                                </div>
                                                <FieldInfo field={field} />
                                            </div>
                                        )}
                                    </form.Field>
                                </div>
                            </form>
                        </div> 
                    </Card>
                 </TabsContent>
                <TabsContent value="rp">
                    <Card>
                    <div className="ml-5 mr-5 mt-5">
                        <div className="flex items-center gap-2">
                            <Icon iconNode={Shield} className="w-5 h-5" />
                            <Label className="font-black capitalize">{t("ui.createUser.Rol.create")}</Label>
                        </div>
                        <div className="">
                            {/*select*/}
                            <form.Field
                                name="role"
                                defaultValue="1"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 300));
                                        return !value
                                            ? t("ui.validation.required", { attribute: t("ui.users.fields.role").toLowerCase() })
                                            : value === "1"
                                                ? t("ui.createUser.Rol.select.msg")
                                                : undefined;
                                    },
                                }}
                        
                            >
                                {(field) => (
                                    <div>
                                            <Select
                                            value={field.state.value} 
                                            onValueChange={(value) => field.handleChange(value)}
                                        >
                                            <SelectTrigger className="mt-3 border-2 w-full py-2 px-1 rounded-md dark:bg-[#272726]">
                                            <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem value="1">{t("ui.createUser.Rol.select.op1")}</SelectItem>
                                            <SelectItem value="2">{t("ui.createUser.Rol.select.op2")}</SelectItem>
                                            <SelectItem value="3">{t("ui.createUser.Rol.select.op3")}</SelectItem>
                                            <SelectItem value="4">{t("ui.createUser.Rol.select.op4")}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            </form.Field>
                            
                        </div>
                            <div className="p-3"></div>
                            <hr></hr>
                            <div className=" mt-5 mb-5 flex items-center gap-2">
                                <Icon iconNode={Shield} className="w-5 h-5 text-blue-500" />
                                <Label className="font-black capitalize">{t("ui.createUser.Rol.permission.title")}</Label>
                            </div>
                            {/*DIV DE LOS 4 DIVS */}
                            <div className="mb-4 grid grid-cols-2 grid-rows-2 gap-4 ">
                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={Users} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.createUser.Rol.permission.users.title")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="usuarios.1" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="usuarios.1" className="text-sm">{t("ui.createUser.Rol.permission.users.1")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="usuarios.2" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="usuarios.2" className="text-sm">{t("ui.createUser.Rol.permission.users.2")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                    <Checkbox id="usuarios.3" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="usuarios.3" className="text-sm">{t("ui.createUser.Rol.permission.users.3")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                    <Checkbox id="usuarios.4" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="usuarios.4" className="text-sm">{t("ui.createUser.Rol.permission.users.4")}</Label>        
                                    </div>
                                </div>


                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={PackageOpen} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.createUser.Rol.permission.products.title")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="productos.1" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="productos.1" className="text-sm">{t("ui.createUser.Rol.permission.products.1")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="productos.2" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="productos.2" className="text-sm">{t("ui.createUser.Rol.permission.products.2")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="productos.3" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="productos.3" className="text-sm">{t("ui.createUser.Rol.permission.products.3")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="productos.4" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="productos.4" className="text-sm">{t("ui.createUser.Rol.permission.products.4")}</Label>        
                                    </div>
                                </div>


                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={FileText} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.createUser.Rol.permission.reports.title")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="reportes.1" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="reportes.1" className="text-sm">{t("ui.createUser.Rol.permission.reports.1")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="reportes.2" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="reportes.2" className="text-sm">{t("ui.createUser.Rol.permission.reports.2")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="reportes.3" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="reportes.3" className="text-sm">{t("ui.createUser.Rol.permission.reports.3")}</Label>        
                                    </div>
                                </div>


                                <div className="border p-4 rounded-lg bg-gray-100 dark:bg-[#272726]">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Icon iconNode={Settings} className="w-4 h-4 text-blue-500" />
                                        <Label className="text-sm font-black">{t("ui.createUser.Rol.permission.settings.title")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="conf.1" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="conf.1" className="text-sm">{t("ui.createUser.Rol.permission.settings.1")}</Label>        
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="conf.2" style={{ color: "blue" }} className="border-1 border-blue-500 bg-white" />
                                        <Label htmlFor="conf.2" className="text-sm">{t("ui.createUser.Rol.permission.settings.2")}</Label>        
                                    </div>

                                </div>

                            </div>

                        </div>
                    </Card>
                </TabsContent>
            </Tabs>   
            <div className="p-3"></div>      
        <hr></hr>
        <div className="p-3 bg-gray-100 dark:bg-[#272726] "></div>
        {/* DIV BOTONES */}
        <div className="grid grid-cols-2 justify-items-end gap-4 bg-gray-100 dark:bg-[#272726]"> 
                <Button
                className="justify-self-start hover:bg-red-500 ml-4"
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
                    <Icon iconNode={X} className="w-5 h-5" />
                    {t("ui.users.buttons.cancel")}
                </Button>

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button className="bg-blue-500 mr-4" type="submit" disabled={!canSubmit} >
                            <Icon iconNode={Save} className="w-5 h-5" />
                            {isSubmitting
                                ? t("ui.users.buttons.saving")
                                : initialData
                                    ? t("ui.users.buttons.update")
                                    : t("ui.users.buttons.save")}
                        </Button>
                    )}
                </form.Subscribe>
            </div>
            <div className="rounded-b-lg p-2.5 bg-gray-100 dark:bg-[#272726]"></div>
        </div>
</div>
    );
}
