"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.InstituicaoService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var path = require("path");
var fs = require("fs");
var InstituicaoSelection = {
    id: true,
    razaoSocial: true,
    email: true,
    fotoPerfil: true,
    endereco: true,
};
var InstituicaoService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var InstituicaoService = _classThis = /** @class */ (function () {
        function InstituicaoService_1(prisma) {
            this.prisma = prisma;
        }
        InstituicaoService_1.prototype.create = function (createInstituicaoDto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingInstituicao, hashedPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.instituicao.findUnique({
                                where: { email: createInstituicaoDto.email },
                            })];
                        case 1:
                            existingInstituicao = _a.sent();
                            if (existingInstituicao) {
                                throw new common_1.ConflictException('Este e-mail já está em uso.');
                            }
                            return [4 /*yield*/, bcrypt.hash(createInstituicaoDto.senha, 10)];
                        case 2:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, this.prisma.instituicao.create({
                                    data: __assign(__assign({}, createInstituicaoDto), { senha: hashedPassword }),
                                    select: InstituicaoSelection,
                                })];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        InstituicaoService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.instituicao.findMany({
                                select: InstituicaoSelection,
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        InstituicaoService_1.prototype.findInstituicao = function (criterio) {
            return __awaiter(this, void 0, void 0, function () {
                var instituicao;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!criterio.id && !criterio.email) {
                                throw new common_1.BadRequestException('É necessário informar o id ou o email da Instituição.');
                            }
                            return [4 /*yield*/, this.prisma.instituicao.findUnique({
                                    where: criterio,
                                })];
                        case 1:
                            instituicao = _a.sent();
                            if (!instituicao) {
                                throw new common_1.NotFoundException('Instituição não encontrada.');
                            }
                            return [2 /*return*/, instituicao];
                    }
                });
            });
        };
        InstituicaoService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.findInstituicao({ id: id })];
                });
            });
        };
        InstituicaoService_1.prototype.findByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.findInstituicao({ email: email })];
                });
            });
        };
        InstituicaoService_1.prototype.update = function (id, updateInstituicaoDto) {
            return __awaiter(this, void 0, void 0, function () {
                var instituicao, _a, existingInstituicao;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.instituicao.findUnique({
                                where: { id: id },
                            })];
                        case 1:
                            instituicao = _b.sent();
                            if (!instituicao) {
                                throw new common_1.NotFoundException('Instituição não encontrada.');
                            }
                            if (!updateInstituicaoDto.senha) return [3 /*break*/, 3];
                            _a = updateInstituicaoDto;
                            return [4 /*yield*/, bcrypt.hash(updateInstituicaoDto.senha, 10)];
                        case 2:
                            _a.senha = _b.sent();
                            _b.label = 3;
                        case 3:
                            if (!updateInstituicaoDto.email) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.instituicao.findUnique({
                                    where: { email: updateInstituicaoDto.email },
                                })];
                        case 4:
                            existingInstituicao = _b.sent();
                            if (existingInstituicao && existingInstituicao.id !== id) {
                                throw new common_1.ConflictException('Este e-mail já está em uso por outra instituição.');
                            }
                            _b.label = 5;
                        case 5: return [4 /*yield*/, this.prisma.instituicao.update({
                                where: { id: id },
                                data: __assign({}, updateInstituicaoDto),
                                select: InstituicaoSelection,
                            })];
                        case 6: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        InstituicaoService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var instituicao;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.instituicao.findUnique({
                                where: { id: id },
                            })];
                        case 1:
                            instituicao = _a.sent();
                            if (!instituicao) {
                                throw new common_1.NotFoundException('Instituição não encontrada.');
                            }
                            return [4 /*yield*/, this.prisma.instituicao.delete({
                                    where: { id: id },
                                    select: InstituicaoSelection,
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        InstituicaoService_1.prototype.uploadInstitutionPic = function (file, id) {
            return __awaiter(this, void 0, void 0, function () {
                var instituicao, uploadPath, filePath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!file) {
                                throw new common_1.BadRequestException('Arquivo não fornecido');
                            }
                            return [4 /*yield*/, this.prisma.instituicao.findUnique({
                                    where: { id: id },
                                })];
                        case 1:
                            instituicao = _a.sent();
                            if (!instituicao) {
                                throw new common_1.NotFoundException('Instituição não encontrada.');
                            }
                            uploadPath = path.join(__dirname, '..', '..', 'uploads', 'upload-institution-photo');
                            filePath = path.join(uploadPath, file.originalname);
                            if (!fs.existsSync(uploadPath)) {
                                fs.mkdirSync(uploadPath, { recursive: true });
                            }
                            fs.writeFileSync(filePath, file.buffer);
                            return [4 /*yield*/, this.prisma.instituicao.update({
                                    where: { id: id },
                                    data: { fotoPerfil: filePath },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, filePath];
                    }
                });
            });
        };
        InstituicaoService_1.prototype.getInstitutionPic = function (id, res) {
            return __awaiter(this, void 0, void 0, function () {
                var instituicao, filePath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.instituicao.findUnique({
                                where: { id: id },
                                select: { fotoPerfil: true },
                            })];
                        case 1:
                            instituicao = _a.sent();
                            if (!instituicao || !instituicao.fotoPerfil) {
                                throw new common_1.NotFoundException('Foto não encontrada.');
                            }
                            filePath = instituicao.fotoPerfil;
                            if (!fs.existsSync(filePath)) {
                                throw new common_1.NotFoundException('Arquivo de imagem não encontrado.');
                            }
                            res.setHeader('Content-Type', 'image/jpeg');
                            fs.createReadStream(filePath).pipe(res);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return InstituicaoService_1;
    }());
    __setFunctionName(_classThis, "InstituicaoService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InstituicaoService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InstituicaoService = _classThis;
}();
exports.InstituicaoService = InstituicaoService;
