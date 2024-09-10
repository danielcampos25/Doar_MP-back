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
exports.CreateDonationDto = void 0;
var mapped_types_1 = require("@nestjs/mapped-types");
var donation_entity_1 = require("../entities/donation.entity");
var swagger_1 = require("@nestjs/swagger");
var CreateDonationDto = function () {
    var _a;
    var _classSuper = (0, mapped_types_1.PickType)(donation_entity_1.DonationEntity, [
        'descricao',
        'qtdItens',
        'QRCode',
        'codigoRastreamento',
        'entregue',
        'usuarioID',
        'destinatarioID',
    ]);
    var _instanceExtraInitializers = [];
    var _descricao_decorators;
    var _descricao_initializers = [];
    var _qtdItens_decorators;
    var _qtdItens_initializers = [];
    var _QRCode_decorators;
    var _QRCode_initializers = [];
    var _codigoRastreamento_decorators;
    var _codigoRastreamento_initializers = [];
    var _entregue_decorators;
    var _entregue_initializers = [];
    var _usuarioID_decorators;
    var _usuarioID_initializers = [];
    var _destinatarioID_decorators;
    var _destinatarioID_initializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(CreateDonationDto, _super);
            function CreateDonationDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.descricao = (__runInitializers(_this, _instanceExtraInitializers), __runInitializers(_this, _descricao_initializers, void 0));
                _this.qtdItens = __runInitializers(_this, _qtdItens_initializers, void 0);
                _this.QRCode = __runInitializers(_this, _QRCode_initializers, void 0);
                _this.codigoRastreamento = __runInitializers(_this, _codigoRastreamento_initializers, void 0);
                _this.entregue = __runInitializers(_this, _entregue_initializers, void 0);
                _this.usuarioID = __runInitializers(_this, _usuarioID_initializers, void 0);
                _this.destinatarioID = __runInitializers(_this, _destinatarioID_initializers, void 0);
                return _this;
            }
            return CreateDonationDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _descricao_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Descrição da doação',
                    example: 'Roupa usada em bom estado'
                })];
            _qtdItens_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Quantidade de itens',
                    example: 4
                })];
            _QRCode_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'QR code gerado para a doação',
                    example: 'QRCode_String'
                })];
            _codigoRastreamento_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Código de rastreamento da doação',
                    example: 'BR123456789'
                })];
            _entregue_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Status da entrega',
                    example: true
                })];
            _usuarioID_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID do usuário que fez a doação',
                    example: 1027
                })];
            _destinatarioID_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID do usuário que receberá a doação',
                    example: 2
                })];
            __esDecorate(null, null, _descricao_decorators, { kind: "field", name: "descricao", static: false, private: false, access: { has: function (obj) { return "descricao" in obj; }, get: function (obj) { return obj.descricao; }, set: function (obj, value) { obj.descricao = value; } }, metadata: _metadata }, _descricao_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _qtdItens_decorators, { kind: "field", name: "qtdItens", static: false, private: false, access: { has: function (obj) { return "qtdItens" in obj; }, get: function (obj) { return obj.qtdItens; }, set: function (obj, value) { obj.qtdItens = value; } }, metadata: _metadata }, _qtdItens_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _QRCode_decorators, { kind: "field", name: "QRCode", static: false, private: false, access: { has: function (obj) { return "QRCode" in obj; }, get: function (obj) { return obj.QRCode; }, set: function (obj, value) { obj.QRCode = value; } }, metadata: _metadata }, _QRCode_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _codigoRastreamento_decorators, { kind: "field", name: "codigoRastreamento", static: false, private: false, access: { has: function (obj) { return "codigoRastreamento" in obj; }, get: function (obj) { return obj.codigoRastreamento; }, set: function (obj, value) { obj.codigoRastreamento = value; } }, metadata: _metadata }, _codigoRastreamento_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _entregue_decorators, { kind: "field", name: "entregue", static: false, private: false, access: { has: function (obj) { return "entregue" in obj; }, get: function (obj) { return obj.entregue; }, set: function (obj, value) { obj.entregue = value; } }, metadata: _metadata }, _entregue_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _usuarioID_decorators, { kind: "field", name: "usuarioID", static: false, private: false, access: { has: function (obj) { return "usuarioID" in obj; }, get: function (obj) { return obj.usuarioID; }, set: function (obj, value) { obj.usuarioID = value; } }, metadata: _metadata }, _usuarioID_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _destinatarioID_decorators, { kind: "field", name: "destinatarioID", static: false, private: false, access: { has: function (obj) { return "destinatarioID" in obj; }, get: function (obj) { return obj.destinatarioID; }, set: function (obj, value) { obj.destinatarioID = value; } }, metadata: _metadata }, _destinatarioID_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateDonationDto = CreateDonationDto;
