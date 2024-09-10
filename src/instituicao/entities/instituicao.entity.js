"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituicaoEntity = void 0;
var class_validator_1 = require("class-validator");
var InstituicaoEntity = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _razaoSocial_decorators;
    var _razaoSocial_initializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _senha_decorators;
    var _senha_initializers = [];
    var _fotoPerfil_decorators;
    var _fotoPerfil_initializers = [];
    var _endereco_decorators;
    var _endereco_initializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    return _a = /** @class */ (function () {
            function InstituicaoEntity() {
                this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
                this.razaoSocial = __runInitializers(this, _razaoSocial_initializers, void 0);
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.senha = __runInitializers(this, _senha_initializers, void 0);
                this.fotoPerfil = __runInitializers(this, _fotoPerfil_initializers, void 0);
                this.endereco = __runInitializers(this, _endereco_initializers, void 0);
                this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
                this.updatedAt = __runInitializers(this, _updatedAt_initializers, void 0);
            }
            return InstituicaoEntity;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_validator_1.IsNumber)()];
            _razaoSocial_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'A razão social não pode estar vazio.' }), (0, class_validator_1.IsString)({ message: 'A razão social deve ser uma string.' })];
            _email_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'O email não pode estar vazio.' }), (0, class_validator_1.IsEmail)({}, { message: 'Deve ser um endereço de email válido.' })];
            _senha_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'A senha não pode estar vazia.' }), (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }), (0, class_validator_1.MinLength)(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })];
            _fotoPerfil_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({
                    message: 'A foto de perfil deve ser armazenada como uma string.',
                })];
            _endereco_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'O ID do endereço não pode estar vazio.' }), (0, class_validator_1.IsString)({ message: 'O endereço deve ser uma string.' })];
            _createdAt_decorators = [(0, class_validator_1.IsDate)()];
            _updatedAt_decorators = [(0, class_validator_1.IsDate)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _razaoSocial_decorators, { kind: "field", name: "razaoSocial", static: false, private: false, access: { has: function (obj) { return "razaoSocial" in obj; }, get: function (obj) { return obj.razaoSocial; }, set: function (obj, value) { obj.razaoSocial = value; } }, metadata: _metadata }, _razaoSocial_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _senha_decorators, { kind: "field", name: "senha", static: false, private: false, access: { has: function (obj) { return "senha" in obj; }, get: function (obj) { return obj.senha; }, set: function (obj, value) { obj.senha = value; } }, metadata: _metadata }, _senha_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _fotoPerfil_decorators, { kind: "field", name: "fotoPerfil", static: false, private: false, access: { has: function (obj) { return "fotoPerfil" in obj; }, get: function (obj) { return obj.fotoPerfil; }, set: function (obj, value) { obj.fotoPerfil = value; } }, metadata: _metadata }, _fotoPerfil_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _endereco_decorators, { kind: "field", name: "endereco", static: false, private: false, access: { has: function (obj) { return "endereco" in obj; }, get: function (obj) { return obj.endereco; }, set: function (obj, value) { obj.endereco = value; } }, metadata: _metadata }, _endereco_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.InstituicaoEntity = InstituicaoEntity;
