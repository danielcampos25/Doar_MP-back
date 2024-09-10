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
exports.TrackingEntity = void 0;
var class_validator_1 = require("class-validator");
var TrackingEntity = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _doacaoID_decorators;
    var _doacaoID_initializers = [];
    var _localizacao_decorators;
    var _localizacao_initializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    return _a = /** @class */ (function () {
            function TrackingEntity() {
                this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
                this.doacaoID = __runInitializers(this, _doacaoID_initializers, void 0);
                this.localizacao = __runInitializers(this, _localizacao_initializers, void 0);
                this.status = __runInitializers(this, _status_initializers, void 0);
                // Assumindo que `Midias[]` é um array de IDs ou objetos, ajuste conforme necessário
                //midias: any[];
                this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
                this.updatedAt = __runInitializers(this, _updatedAt_initializers, void 0);
            }
            return TrackingEntity;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_validator_1.IsInt)()];
            _doacaoID_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsInt)()];
            _localizacao_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'A localização não pode estar vazia.' }), (0, class_validator_1.IsString)({ message: 'A localização deve ser uma string.' })];
            _status_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'O status não pode estar vazio.' }), (0, class_validator_1.IsString)({ message: 'O status deve ser uma string.' })];
            _createdAt_decorators = [(0, class_validator_1.IsDate)()];
            _updatedAt_decorators = [(0, class_validator_1.IsDate)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _doacaoID_decorators, { kind: "field", name: "doacaoID", static: false, private: false, access: { has: function (obj) { return "doacaoID" in obj; }, get: function (obj) { return obj.doacaoID; }, set: function (obj, value) { obj.doacaoID = value; } }, metadata: _metadata }, _doacaoID_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _localizacao_decorators, { kind: "field", name: "localizacao", static: false, private: false, access: { has: function (obj) { return "localizacao" in obj; }, get: function (obj) { return obj.localizacao; }, set: function (obj, value) { obj.localizacao = value; } }, metadata: _metadata }, _localizacao_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TrackingEntity = TrackingEntity;
