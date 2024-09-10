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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var fs = require("fs");
var path = require("path");
var mime = require("mime-types");
var UserSelection = {
    id: true,
    nome: true,
    email: true,
    fotoPerfil: true,
    endereco: true,
};
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(prisma) {
            this.prisma = prisma;
        }
        UsersService_1.prototype.create = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, hashedPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.usuario.findUnique({
                                where: { email: createUserDto.email },
                            })];
                        case 1:
                            existingUser = _a.sent();
                            if (existingUser) {
                                throw new common_1.ConflictException('Este e-mail já está em uso.');
                            }
                            return [4 /*yield*/, bcrypt.hash(createUserDto.senha, 10)];
                        case 2:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, this.prisma.usuario.create({
                                    data: __assign(__assign({}, createUserDto), { senha: hashedPassword }),
                                    select: UserSelection,
                                })];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.usuario.findMany({
                                select: UserSelection,
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.findUser = function (criterio) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!criterio.id && !criterio.email) {
                                throw new common_1.BadRequestException('É necessário informar o id ou o email do usuário.');
                            }
                            return [4 /*yield*/, this.prisma.usuario.findUnique({
                                    where: criterio,
                                })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('Usuário não encontrado.');
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.findUser({ id: id })];
                });
            });
        };
        UsersService_1.prototype.findByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.findUser({ email: email })];
                });
            });
        };
        UsersService_1.prototype.update = function (id, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, existingUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.usuario.findUnique({ where: { id: id } })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('Usuário não encontrado.');
                            }
                            if (!updateUserDto.senha) return [3 /*break*/, 3];
                            _a = updateUserDto;
                            return [4 /*yield*/, bcrypt.hash(updateUserDto.senha, 10)];
                        case 2:
                            _a.senha = _b.sent();
                            _b.label = 3;
                        case 3:
                            if (!updateUserDto.email) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.usuario.findUnique({
                                    where: { email: updateUserDto.email },
                                })];
                        case 4:
                            existingUser = _b.sent();
                            if (existingUser && existingUser.id !== id) {
                                throw new common_1.ConflictException('Este e-mail já está em uso por outro usuário.');
                            }
                            _b.label = 5;
                        case 5: return [4 /*yield*/, this.prisma.usuario.update({
                                where: { id: id },
                                data: __assign({}, updateUserDto),
                                select: UserSelection,
                            })];
                        case 6: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.usuario.findUnique({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('Usuário não encontrado.');
                            }
                            return [4 /*yield*/, this.prisma.usuario.delete({
                                    where: { id: id },
                                    select: UserSelection,
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.uploadUserPic = function (file, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var uploadDir, filePath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!file) {
                                throw new common_1.BadRequestException('Arquivo não fornecido');
                            }
                            uploadDir = path.join(__dirname, '..', '..', 'uploads', 'upload-user-photo');
                            if (!fs.existsSync(uploadDir)) {
                                fs.mkdirSync(uploadDir, { recursive: true });
                            }
                            filePath = path.join(uploadDir, "".concat(userId, "-").concat(file.originalname));
                            // Salvar o arquivo
                            fs.writeFileSync(filePath, file.buffer);
                            // Atualizar a foto do perfil no banco de dados
                            return [4 /*yield*/, this.prisma.usuario.update({
                                    where: { id: userId },
                                    data: { fotoPerfil: filePath }, // Atualize com o caminho desejado
                                })];
                        case 1:
                            // Atualizar a foto do perfil no banco de dados
                            _a.sent();
                            return [2 /*return*/, filePath]; // Retorne o caminho do arquivo salvo
                    }
                });
            });
        };
        UsersService_1.prototype.getUserPic = function (userId, res) {
            return __awaiter(this, void 0, void 0, function () {
                var user, filePath, mimeType;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.usuario.findUnique({
                                where: { id: userId },
                                select: { fotoPerfil: true }, // Pegando apenas a foto de perfil
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user || !user.fotoPerfil) {
                                throw new common_1.NotFoundException('Foto de perfil não encontrada.');
                            }
                            filePath = user.fotoPerfil;
                            if (!fs.existsSync(filePath)) {
                                throw new common_1.NotFoundException('Arquivo de imagem não encontrado.');
                            }
                            mimeType = mime.lookup(filePath) || 'application/octet-stream';
                            res.setHeader('Content-Type', mimeType);
                            // Faz o streaming do arquivo de imagem
                            fs.createReadStream(filePath).pipe(res);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
