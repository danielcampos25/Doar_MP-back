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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsController = void 0;
var common_1 = require("@nestjs/common");
var donation_entity_1 = require("./entities/donation.entity");
var donationOwnershipGuard_guard_1 = require("../auth/guards/donationOwnershipGuard.guard");
var swagger_1 = require("@nestjs/swagger");
var DonationsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Doações'), (0, common_1.Controller)('donations')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _entregaConcluida_decorators;
    var _remove_decorators;
    var DonationsController = _classThis = /** @class */ (function () {
        function DonationsController_1(donationsService) {
            this.donationsService = (__runInitializers(this, _instanceExtraInitializers), donationsService);
        }
        DonationsController_1.prototype.create = function (createDonationDto) {
            return this.donationsService.create(createDonationDto);
        };
        DonationsController_1.prototype.findAll = function () {
            return this.donationsService.findAll();
        };
        DonationsController_1.prototype.findOne = function (id) {
            return this.donationsService.findOne(Number(id));
        };
        DonationsController_1.prototype.update = function (id, updateDonationDto) {
            return this.donationsService.update(Number(id), updateDonationDto);
        };
        DonationsController_1.prototype.entregaConcluida = function (id) {
            return this.donationsService.entregaConcluida(Number(id));
        };
        DonationsController_1.prototype.remove = function (id) {
            return this.donationsService.remove(Number(id));
        };
        return DonationsController_1;
    }());
    __setFunctionName(_classThis, "DonationsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Cria uma nova doação' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Doação criada com sucesso' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' })];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as doações' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de todas as doações', type: [donation_entity_1.DonationEntity] })];
        _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Retorna a doação requisitada' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Doação encontrada', type: donation_entity_1.DonationEntity }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Doação não encontrada' })];
        _update_decorators = [(0, common_1.UseGuards)(donationOwnershipGuard_guard_1.DonationOwnershipGuard), (0, common_1.Patch)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma doação' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Doação atualizada com sucesso', type: donation_entity_1.DonationEntity }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Usuário não autorizado' })];
        _entregaConcluida_decorators = [(0, common_1.Patch)(':id/entrega-concluida'), (0, swagger_1.ApiOperation)({ summary: 'Marca a entrega de uma doação como concluída' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Doação marcada como entregue', type: donation_entity_1.DonationEntity })];
        _remove_decorators = [(0, common_1.UseGuards)(donationOwnershipGuard_guard_1.DonationOwnershipGuard), (0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Remove uma doação' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Doação removida com sucesso' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Usuário não autorizado' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _entregaConcluida_decorators, { kind: "method", name: "entregaConcluida", static: false, private: false, access: { has: function (obj) { return "entregaConcluida" in obj; }, get: function (obj) { return obj.entregaConcluida; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DonationsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DonationsController = _classThis;
}();
exports.DonationsController = DonationsController;
