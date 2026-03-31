module.exports = [
"[project]/lib/store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCategoryInStore",
    ()=>createCategoryInStore,
    "createToolInStore",
    ()=>createToolInStore,
    "deleteCategoryFromStore",
    ()=>deleteCategoryFromStore,
    "deleteToolFromStore",
    ()=>deleteToolFromStore,
    "generateToolCode",
    ()=>generateToolCode,
    "getCategoriesFromStore",
    ()=>getCategoriesFromStore,
    "getToolFromStore",
    ()=>getToolFromStore,
    "getToolsFromStore",
    ()=>getToolsFromStore,
    "updateToolInStore",
    ()=>updateToolInStore
]);
// Store en memoria (sin datos iniciales)
const tools = [];
let nextId = 1;
function getToolsFromStore(search) {
    if (!search) return [
        ...tools
    ].sort((a, b)=>b.created_at.getTime() - a.created_at.getTime());
    const searchLower = search.toLowerCase();
    return tools.filter((t)=>t.name.toLowerCase().includes(searchLower) || t.code.toLowerCase().includes(searchLower)).sort((a, b)=>b.created_at.getTime() - a.created_at.getTime());
}
function getToolFromStore(id) {
    return tools.find((t)=>t.id === id) || null;
}
function generateToolCode(category) {
    // Obtener las 3 primeras letras de la categoría (sin espacios ni caracteres especiales)
    const cleanCategory = category.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const prefix = cleanCategory.substring(0, 3).padEnd(3, "X");
    // Encontrar todos los códigos existentes con este prefijo
    const existingCodes = tools.filter((t)=>t.code.startsWith(prefix + "-")).map((t)=>{
        const parts = t.code.split("-");
        return parts.length > 1 ? parseInt(parts[1]) || 0 : 0;
    });
    // Obtener el siguiente número disponible
    const maxNumber = existingCodes.length > 0 ? Math.max(...existingCodes) : 0;
    const nextNumber = maxNumber + 1;
    return `${prefix}-${nextNumber.toString().padStart(3, "0")}`;
}
function createToolInStore(data) {
    const newTool = {
        id: nextId++,
        code: data.code,
        name: data.name,
        description: null,
        category: data.category || null,
        quantity: 1,
        status: data.status,
        location: data.location || null,
        observations: data.observations || null,
        created_at: new Date(),
        updated_at: new Date()
    };
    tools.push(newTool);
    return newTool;
}
function updateToolInStore(id, data) {
    const index = tools.findIndex((t)=>t.id === id);
    if (index === -1) return null;
    tools[index] = {
        ...tools[index],
        code: data.code,
        name: data.name,
        category: data.category || null,
        status: data.status,
        location: data.location || null,
        observations: data.observations || null,
        updated_at: new Date()
    };
    return tools[index];
}
function deleteToolFromStore(id) {
    const index = tools.findIndex((t)=>t.id === id);
    if (index === -1) return false;
    tools.splice(index, 1);
    return true;
}
// Categorías (sin datos iniciales)
const categories = [];
function getCategoriesFromStore() {
    return [
        ...categories
    ].sort();
}
function createCategoryInStore(name) {
    if (categories.includes(name)) return false;
    categories.push(name);
    return true;
}
function deleteCategoryFromStore(name) {
    const index = categories.indexOf(name);
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
}
}),
"[project]/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00b54ba2408cbf298f9f80313cb2294431950a53a9":"getCategories","401be0b412430005369ddc452696fbfd628df53b4c":"getTools","40911738c419404eb8e4ced2be2dcd8b723c30b5ba":"createCategory","409f79f8ca0afb3da742c7f3e7f13422ea2d149993":"getGeneratedCode","40a7ad58d34ecf46cd9363c9a3102d89ed18984200":"deleteCategory","40d873c8908ddeecd8c4e3f03b135fb720c625e062":"createTool","40f31d555db2114eba3d0663171bd5f6c7f3396752":"deleteTool","40f8ec15c69db7c63f0615151aa760abb2d0eaad24":"getTool","602efede59d0413e95a51411637d01beb1768fe178":"updateTool"},"",""] */ __turbopack_context__.s([
    "createCategory",
    ()=>createCategory,
    "createTool",
    ()=>createTool,
    "deleteCategory",
    ()=>deleteCategory,
    "deleteTool",
    ()=>deleteTool,
    "getCategories",
    ()=>getCategories,
    "getGeneratedCode",
    ()=>getGeneratedCode,
    "getTool",
    ()=>getTool,
    "getTools",
    ()=>getTools,
    "updateTool",
    ()=>updateTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getTools(search) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getToolsFromStore"])(search);
}
async function getTool(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getToolFromStore"])(id);
}
async function createTool(data) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createToolInStore"])(data);
        return {
            success: true
        };
    } catch (error) {
        console.error("Error creating tool:", error);
        return {
            success: false,
            error: "Error al crear la herramienta"
        };
    }
}
async function updateTool(id, data) {
    try {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateToolInStore"])(id, data);
        if (!result) {
            return {
                success: false,
                error: "Herramienta no encontrada"
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("Error updating tool:", error);
        return {
            success: false,
            error: "Error al actualizar la herramienta"
        };
    }
}
async function deleteTool(id) {
    try {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteToolFromStore"])(id);
        if (!result) {
            return {
                success: false,
                error: "Herramienta no encontrada"
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting tool:", error);
        return {
            success: false,
            error: "Error al eliminar la herramienta"
        };
    }
}
async function getGeneratedCode(category) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateToolCode"])(category);
}
async function getCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoriesFromStore"])();
}
async function createCategory(name) {
    try {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategoryInStore"])(name);
        if (!result) {
            return {
                success: false,
                error: "La categoría ya existe"
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("Error creating category:", error);
        return {
            success: false,
            error: "Error al crear la categoría"
        };
    }
}
async function deleteCategory(name) {
    try {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategoryFromStore"])(name);
        if (!result) {
            return {
                success: false,
                error: "Categoría no encontrada"
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("Error deleting category:", error);
        return {
            success: false,
            error: "Error al eliminar la categoría"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTools,
    getTool,
    createTool,
    updateTool,
    deleteTool,
    getGeneratedCode,
    getCategories,
    createCategory,
    deleteCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTools, "401be0b412430005369ddc452696fbfd628df53b4c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTool, "40f8ec15c69db7c63f0615151aa760abb2d0eaad24", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTool, "40d873c8908ddeecd8c4e3f03b135fb720c625e062", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTool, "602efede59d0413e95a51411637d01beb1768fe178", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTool, "40f31d555db2114eba3d0663171bd5f6c7f3396752", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGeneratedCode, "409f79f8ca0afb3da742c7f3e7f13422ea2d149993", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategories, "00b54ba2408cbf298f9f80313cb2294431950a53a9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "40911738c419404eb8e4ced2be2dcd8b723c30b5ba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "40a7ad58d34ecf46cd9363c9a3102d89ed18984200", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00b54ba2408cbf298f9f80313cb2294431950a53a9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"],
    "401be0b412430005369ddc452696fbfd628df53b4c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTools"],
    "40911738c419404eb8e4ced2be2dcd8b723c30b5ba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategory"],
    "409f79f8ca0afb3da742c7f3e7f13422ea2d149993",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGeneratedCode"],
    "40a7ad58d34ecf46cd9363c9a3102d89ed18984200",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategory"],
    "40d873c8908ddeecd8c4e3f03b135fb720c625e062",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTool"],
    "40f31d555db2114eba3d0663171bd5f6c7f3396752",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTool"],
    "602efede59d0413e95a51411637d01beb1768fe178",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTool"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_33facca4._.js.map