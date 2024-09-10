"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoController = void 0;
var common_1 = require("@nestjs/common");
var isPublic_decorator_1 = require("../auth/decorators/isPublic.decorator");
var ownershipGuard_guard_1 = require("../auth/guards/ownershipGuard.guard");
var platform_express_1 = require("@nestjs/platform-express");
var multer = require("multer");
var swagger_1 = require("@nestjs/swagger");
var InstituicaoController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Instituições'), (0, common_1.Controller)('instituicoes')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _getInstitutionPic_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _uploadInstitutionPic_decorators;
    var InstituicaoController = _classThis = /** @class */ (function () {
        function InstituicaoController_1(instituicaoService) {
            this.instituicaoService = (__runInitializers(this, _instanceExtraInitializers), instituicaoService);
        }
        InstituicaoController_1.prototype.create = function (createInstituicaoDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.instituicaoService.create(createInstituicaoDto)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        InstituicaoController_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.instituicaoService.findAll()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        InstituicaoController_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.instituicaoService.findOne(+id)];
                        case 1: return [2 /*return*/, _a.sent()]; // Converte para número
                    }
                });
            });
        };
        InstituicaoController_1.prototype.getInstitutionPic = function (id, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.instituicaoService.getInstitutionPic(+id, res)];
                });
            });
        };
        InstituicaoController_1.prototype.update = function (id, updateInstituicaoDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.instituicaoService.update(+id, updateInstituicaoDto)];
                        case 1: return [2 /*return*/, _a.sent()]; // Converte para número
                    }
                });
            });
        };
        InstituicaoController_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.instituicaoService.remove(+id)];
                        case 1:
                            _a.sent(); // Converte para número
                            return [2 /*return*/];
                    }
                });
            });
        };
        InstituicaoController_1.prototype.uploadInstitutionPic = function (id, file, res) {
            return __awaiter(this, void 0, void 0, function () {
                var filePath, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.instituicaoService.uploadInstitutionPic(file, +id)];
                        case 1:
                            filePath = _a.sent();
                            return [2 /*return*/, res.json({
                                    message: 'Foto institucional carregada com sucesso',
                                    filePath: filePath,
                                })];
                        case 2:
                            error_1 = _a.sent();
                            return [2 /*return*/, res
                                    .status(error_1.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                                    .json({ message: error_1.message })];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return InstituicaoController_1;
    }());
    __setFunctionName(_classThis, "InstituicaoController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, isPublic_decorator_1.Public)(), (0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova instituição' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Instituição criada com sucesso' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados invalidos' }), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as instituições cadastradas' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de todas as instituições' })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Retorna a instituição requisitada pelo id de instituição' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Instituição encontrada' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Instituição não encontrada' })];
        _getInstitutionPic_decorators = [(0, common_1.Get)('foto/:id'), (0, swagger_1.ApiOperation)({ summary: 'Retorna a foto da instituição requisitada' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Foto da instituição encontrada' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Foto da instituição não encontrada' })];
        _update_decorators = [(0, common_1.UseGuards)(ownershipGuard_guard_1.OwnershipGuard), (0, common_1.Patch)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma instituição' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Instituição atualizada com sucesso' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Usuário não autorizado' })];
        _remove_decorators = [(0, common_1.UseGuards)(ownershipGuard_guard_1.OwnershipGuard), (0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Deleta uma instituição' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Instituição deletada com sucesso' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Usuário não autorizado' }), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
        _uploadInstitutionPic_decorators = [(0, common_1.Post)(':id/upload-photo'), (0, swagger_1.ApiOperation)({ summary: 'Salva a foto na memória antes de salvá-la no disco' }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                storage: multer.memoryStorage(), // Armazenar o arquivo na memória antes de salvá-lo no disco
            })), (0, swagger_1.ApiOperation)({ summary: 'Faz o upload da foto da instituição' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Foto institucional carregada com sucesso' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro ao carregar foto institucional' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInstitutionPic_decorators, { kind: "method", name: "getInstitutionPic", static: false, private: false, access: { has: function (obj) { return "getInstitutionPic" in obj; }, get: function (obj) { return obj.getInstitutionPic; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadInstitutionPic_decorators, { kind: "method", name: "uploadInstitutionPic", static: false, private: false, access: { has: function (obj) { return "uploadInstitutionPic" in obj; }, get: function (obj) { return obj.uploadInstitutionPic; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InstituicaoController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InstituicaoController = _classThis;
}();
exports.InstituicaoController = InstituicaoController;
