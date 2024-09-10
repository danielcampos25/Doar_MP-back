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
exports.DonationEntity = void 0;
var class_validator_1 = require("class-validator");
var DonationEntity = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _usuarioID_decorators;
    var _usuarioID_initializers = [];
    var _destinatarioID_decorators;
    var _destinatarioID_initializers = [];
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
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    return _a = /** @class */ (function () {
            function DonationEntity() {
                this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
                this.usuarioID = __runInitializers(this, _usuarioID_initializers, void 0);
                this.destinatarioID = __runInitializers(this, _destinatarioID_initializers, void 0);
                this.descricao = __runInitializers(this, _descricao_initializers, void 0);
                this.qtdItens = __runInitializers(this, _qtdItens_initializers, void 0);
                this.QRCode = __runInitializers(this, _QRCode_initializers, void 0);
                this.codigoRastreamento = __runInitializers(this, _codigoRastreamento_initializers, void 0); // Removido o ? para torná-lo obrigatório
                this.entregue = __runInitializers(this, _entregue_initializers, void 0);
                this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
                this.updatedAt = __runInitializers(this, _updatedAt_initializers, void 0);
            }
            return DonationEntity;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_validator_1.IsInt)()];
            _usuarioID_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsInt)()];
            _destinatarioID_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsInt)()];
            _descricao_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'A descrição não pode estar vazia.' }), (0, class_validator_1.IsString)({ message: 'A descrição deve ser uma string.' })];
            _qtdItens_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'A quantidade de itens não pode estar vazia.' }), (0, class_validator_1.IsInt)({ message: 'A quantidade de itens deve ser um número.' })];
            _QRCode_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
            _codigoRastreamento_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'O código de rastreamento não pode estar vazio.' }), (0, class_validator_1.IsString)({ message: 'O código de rastreamento deve ser uma string.' })];
            _entregue_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsBoolean)()];
            _createdAt_decorators = [(0, class_validator_1.IsDate)()];
            _updatedAt_decorators = [(0, class_validator_1.IsDate)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _usuarioID_decorators, { kind: "field", name: "usuarioID", static: false, private: false, access: { has: function (obj) { return "usuarioID" in obj; }, get: function (obj) { return obj.usuarioID; }, set: function (obj, value) { obj.usuarioID = value; } }, metadata: _metadata }, _usuarioID_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _destinatarioID_decorators, { kind: "field", name: "destinatarioID", static: false, private: false, access: { has: function (obj) { return "destinatarioID" in obj; }, get: function (obj) { return obj.destinatarioID; }, set: function (obj, value) { obj.destinatarioID = value; } }, metadata: _metadata }, _destinatarioID_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _descricao_decorators, { kind: "field", name: "descricao", static: false, private: false, access: { has: function (obj) { return "descricao" in obj; }, get: function (obj) { return obj.descricao; }, set: function (obj, value) { obj.descricao = value; } }, metadata: _metadata }, _descricao_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _qtdItens_decorators, { kind: "field", name: "qtdItens", static: false, private: false, access: { has: function (obj) { return "qtdItens" in obj; }, get: function (obj) { return obj.qtdItens; }, set: function (obj, value) { obj.qtdItens = value; } }, metadata: _metadata }, _qtdItens_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _QRCode_decorators, { kind: "field", name: "QRCode", static: false, private: false, access: { has: function (obj) { return "QRCode" in obj; }, get: function (obj) { return obj.QRCode; }, set: function (obj, value) { obj.QRCode = value; } }, metadata: _metadata }, _QRCode_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _codigoRastreamento_decorators, { kind: "field", name: "codigoRastreamento", static: false, private: false, access: { has: function (obj) { return "codigoRastreamento" in obj; }, get: function (obj) { return obj.codigoRastreamento; }, set: function (obj, value) { obj.codigoRastreamento = value; } }, metadata: _metadata }, _codigoRastreamento_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _entregue_decorators, { kind: "field", name: "entregue", static: false, private: false, access: { has: function (obj) { return "entregue" in obj; }, get: function (obj) { return obj.entregue; }, set: function (obj, value) { obj.entregue = value; } }, metadata: _metadata }, _entregue_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DonationEntity = DonationEntity;
