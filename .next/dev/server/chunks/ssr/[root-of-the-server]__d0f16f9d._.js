module.exports = [
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "testConnection",
    ()=>testConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mysql2/promise.js [app-rsc] (ecmascript)");
;
// Configuración de la conexión a MySQL
const pool = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createPool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "inventario_jj",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Conexión exitosa a MySQL");
        connection.release();
        return true;
    } catch (error) {
        console.error("❌ Error al conectar a MySQL:", error);
        return false;
    }
}
const __TURBOPACK__default__export__ = pool;
}),
"[project]/lib/db-store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCategoryInDB",
    ()=>createCategoryInDB,
    "createToolInDB",
    ()=>createToolInDB,
    "deleteCategoryFromDB",
    ()=>deleteCategoryFromDB,
    "deleteToolFromDB",
    ()=>deleteToolFromDB,
    "generateToolCodeFromDB",
    ()=>generateToolCodeFromDB,
    "getCategoriesFromDB",
    ()=>getCategoriesFromDB,
    "getToolFromDB",
    ()=>getToolFromDB,
    "getToolsFromDB",
    ()=>getToolsFromDB,
    "updateToolInDB",
    ()=>updateToolInDB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
;
async function getToolsFromDB(search) {
    try {
        let query = "SELECT * FROM tools";
        const params = [];
        if (search) {
            query += " WHERE name LIKE ? OR code LIKE ?";
            params.push(`%${search}%`, `%${search}%`);
        }
        query += " ORDER BY created_at DESC";
        const [rows] = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query(query, params);
        return rows;
    } catch (error) {
        console.error("Error al obtener herramientas:", error);
        return [];
    }
}
async function getToolFromDB(id) {
    try {
        const [rows] = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("SELECT * FROM tools WHERE id = ?", [
            id
        ]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Error al obtener herramienta:", error);
        return null;
    }
}
async function createToolInDB(data) {
    try {
        const [result] = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("INSERT INTO tools (code, name, description, category, quantity, status, location, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
            data.code,
            data.name,
            null,
            data.category || null,
            1,
            data.status,
            data.location || null,
            data.observations || null
        ]);
        return getToolFromDB(result.insertId);
    } catch (error) {
        console.error("Error al crear herramienta:", error);
        return null;
    }
}
async function updateToolInDB(id, data) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("UPDATE tools SET code = ?, name = ?, category = ?, status = ?, location = ?, observations = ? WHERE id = ?", [
            data.code,
            data.name,
            data.category || null,
            data.status,
            data.location || null,
            data.observations || null,
            id
        ]);
        return getToolFromDB(id);
    } catch (error) {
        console.error("Error al actualizar herramienta:", error);
        return null;
    }
}
async function deleteToolFromDB(id) {
    try {
        const [result] = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("DELETE FROM tools WHERE id = ?", [
            id
        ]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error al eliminar herramienta:", error);
        return false;
    }
}
async function generateToolCodeFromDB(category) {
    try {
        // Obtener las 3 primeras letras de la categoría (sin espacios ni caracteres especiales)
        const cleanCategory = category.replace(/[^a-zA-Z]/g, "").toUpperCase();
        const prefix = cleanCategory.substring(0, 3).padEnd(3, "X");
        // Encontrar el último código con este prefijo
        const [rows] = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("SELECT code FROM tools WHERE code LIKE ? ORDER BY code DESC LIMIT 1", [
            `${prefix}-%`
        ]);
        let nextNumber = 1;
        if (rows.length > 0) {
            const parts = rows[0].code.split("-");
            if (parts.length > 1) {
                const currentNumber = parseInt(parts[1]) || 0;
                nextNumber = currentNumber + 1;
            }
        }
        return `${prefix}-${nextNumber.toString().padStart(3, "0")}`;
    } catch (error) {
        console.error("Error al generar código:", error);
        return "XXX-001";
    }
}
async function getCategoriesFromDB() {
    try {
        const [rows] = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("SELECT name FROM categories ORDER BY name ASC");
        return rows.map((row)=>row.name);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return [];
    }
}
async function createCategoryInDB(name) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("INSERT INTO categories (name) VALUES (?)", [
            name
        ]);
        return true;
    } catch (error) {
        // Error de duplicado (código 1062)
        if (error.code === "ER_DUP_ENTRY") {
            return false;
        }
        console.error("Error al crear categoría:", error);
        return false;
    }
}
async function deleteCategoryFromDB(name) {
    try {
        // Primero, actualizar todas las herramientas que usan esta categoría a NULL
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("UPDATE tools SET category = NULL WHERE category = ?", [
            name
        ]);
        // Luego eliminar la categoría
        const [result] = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].query("DELETE FROM categories WHERE name = ?", [
            name
        ]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        return false;
    }
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db-store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getTools(search) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getToolsFromDB"])(search);
}
async function getTool(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getToolFromDB"])(id);
}
async function createTool(data) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createToolInDB"])(data);
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
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateToolInDB"])(id, data);
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
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteToolFromDB"])(id);
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateToolCodeFromDB"])(category);
}
async function getCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoriesFromDB"])();
}
async function createCategory(name) {
    try {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategoryInDB"])(name);
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
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategoryFromDB"])(name);
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d0f16f9d._.js.map