"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CreateInstituicaoDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var instituicao_entity_1 = require("../entities/instituicao.entity");
var swagger_1 = require("@nestjs/swagger");
var CreateInstituicaoDto = function () {
    var _a;
    var _classSuper = (0, mapped_types_1.PickType)(instituicao_entity_1.InstituicaoEntity, [
        'razaoSocial',
        'email',
        'senha',
        'fotoPerfil',
        'endereco',
    ]);
    var _instanceExtraInitializers = [];
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
    return _a = /** @class */ (function (_super) {
            __extends(CreateInstituicaoDto, _super);
            function CreateInstituicaoDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.razaoSocial = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _razaoSocial_initializers, void 0));
                _this.email = __runInitializers(_this, _email_initializers, void 0);
                _this.senha = __runInitializers(_this, _senha_initializers, void 0);
                _this.fotoPerfil = __runInitializers(_this, _fotoPerfil_initializers, void 0);
                _this.endereco = __runInitializers(_this, _endereco_initializers, void 0);
                return _this;
            }
            return CreateInstituicaoDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _razaoSocial_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Razão social da instituição',
                    example: 'Ajudar moradores de rua'
                })];
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'E-mail da Instituição',
                    example: 'email_institucional@email.com'
                })];
            _senha_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Senha da Instituição',
                    example: 'senha_institucional123'
                })];
            _fotoPerfil_decorators = [(0, swagger_1.ApiProperty)({
                    description: ' Código da foto de perfil da Instituição',
                    example: 'foto_institocional9383458.jpg'
                })];
            _endereco_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Endereço da Instituição',
                    example: 'Rua institucional, avenida exemplar, bloco E '
                })];
            __esDecorate(null, null, _razaoSocial_decorators, { kind: "field", name: "razaoSocial", static: false, private: false, access: { has: function (obj) { return "razaoSocial" in obj; }, get: function (obj) { return obj.razaoSocial; }, set: function (obj, value) { obj.razaoSocial = value; } }, metadata: _metadata }, _razaoSocial_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _senha_decorators, { kind: "field", name: "senha", static: false, private: false, access: { has: function (obj) { return "senha" in obj; }, get: function (obj) { return obj.senha; }, set: function (obj, value) { obj.senha = value; } }, metadata: _metadata }, _senha_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _fotoPerfil_decorators, { kind: "field", name: "fotoPerfil", static: false, private: false, access: { has: function (obj) { return "fotoPerfil" in obj; }, get: function (obj) { return obj.fotoPerfil; }, set: function (obj, value) { obj.fotoPerfil = value; } }, metadata: _metadata }, _fotoPerfil_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _endereco_decorators, { kind: "field", name: "endereco", static: false, private: false, access: { has: function (obj) { return "endereco" in obj; }, get: function (obj) { return obj.endereco; }, set: function (obj, value) { obj.endereco = value; } }, metadata: _metadata }, _endereco_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateInstituicaoDto = CreateInstituicaoDto;
