(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/u1V":
/*!*********************************************************!*\
  !*** ./src/app/view/main-frame/main-frame.component.ts ***!
  \*********************************************************/
/*! exports provided: MainFrameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainFrameComponent", function() { return MainFrameComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../navbar/navbar.component */ "hB21");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class MainFrameComponent {
    constructor() { }
    ngOnInit() {
    }
}
MainFrameComponent.ɵfac = function MainFrameComponent_Factory(t) { return new (t || MainFrameComponent)(); };
MainFrameComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainFrameComponent, selectors: [["app-main-frame"]], decls: 2, vars: 0, template: function MainFrameComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-navbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
    } }, directives: [_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__["NavbarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWluLWZyYW1lLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\gh\Desktop\alharismi\src\main.ts */"zUnb");


/***/ }),

/***/ "1fSV":
/*!************************************************!*\
  !*** ./src/app/core/services/scene.service.ts ***!
  \************************************************/
/*! exports provided: SceneService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneService", function() { return SceneService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SceneService {
    constructor() {
        this.scene = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](undefined);
        this.played = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('not_played');
        this.set = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
    }
}
SceneService.ɵfac = function SceneService_Factory(t) { return new (t || SceneService)(); };
SceneService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SceneService, factory: SceneService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "1pPF":
/*!*****************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/bubble-sort.ts ***!
  \*****************************************************************/
/*! exports provided: BubbleSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BubbleSort", function() { return BubbleSort; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class BubbleSort {
    sort(arr) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (let i = 0; i < arr.size; ++i) {
                for (let j = 0; j < arr.size - i - 1; ++j) {
                    arr.data[j].highlight('#fdd828');
                    arr.data[j + 1].highlight('#fdd828');
                    yield new Promise(r => setTimeout(r, 600));
                    arr.data[j].resetColor();
                    arr.data[j + 1].resetColor();
                    if (arr.data[j].node.value > arr.data[j + 1].node.value) {
                        yield arr.swapNodes(arr.data[j], arr.data[j + 1]);
                    }
                }
                arr.data[arr.size - i - 1].highlight('#98dc73');
            }
        });
    }
}


/***/ }),

/***/ "1slk":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/node-mouse.ts ***!
  \*************************************************************/
/*! exports provided: NodeMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeMouse", function() { return NodeMouse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-context-menu */ "Ttfg");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(d3_context_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../consts */ "dk8d");




class NodeMouse {
    constructor(simulation) {
        this.simulation = simulation;
    }
    mouseOver(d, i, nodes) {
        const circle = d3__WEBPACK_IMPORTED_MODULE_2__["select"](nodes[i]);
        if (!d.isInteractable) {
            return;
        }
        circle
            .transition()
            .duration(600)
            .ease(d3__WEBPACK_IMPORTED_MODULE_2__["easeElastic"])
            .attr('r', _consts__WEBPACK_IMPORTED_MODULE_3__["defaultRadius"] + 10);
    }
    mouseOut(d, i, nodes) {
        const circle = d3__WEBPACK_IMPORTED_MODULE_2__["select"](nodes[i]);
        if (!d.isInteractable) {
            return;
        }
        circle
            .transition()
            .duration(600)
            .ease(d3__WEBPACK_IMPORTED_MODULE_2__["easeElastic"])
            .attr('r', _consts__WEBPACK_IMPORTED_MODULE_3__["defaultRadius"]);
    }
    contextMenu(d, i, nodes) {
        const menu = [
            {
                title: 'Set value',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = yield this.simulation.prompt('Set value to');
                    let parsed = parseFloat(newValue);
                    if (isNaN(parsed)) {
                        parsed = 69;
                    }
                    // var node_to_find = dataHandler.getAllFiguresOfClass("Circle").filter(d => d.value === number)[0]
                    elm.value = parsed;
                    elm.highlighted = true;
                    yield new Promise(r => setTimeout(r, 1000));
                    elm.highlighted = false;
                })
            },
            {
                title: 'Info log',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    console.log(elm);
                })
            },
            {
                title: 'Delete',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    this.simulation.nodeHandler.remove(elm);
                })
            }
        ];
        d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default()(menu)(d, i);
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element.on('mouseover', (d, i, nodes) => this.mouseOver(d, i, nodes))
            .on('mouseout', (d, i, nodes) => this.mouseOut(d, i, nodes))
            .on('contextmenu', (d, i, nodes) => this.contextMenu(d, i, nodes));
        return element;
    }
}


/***/ }),

/***/ "1yNI":
/*!*************************************************!*\
  !*** ./src/app/view/prompt/prompt.component.ts ***!
  \*************************************************/
/*! exports provided: PromptComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromptComponent", function() { return PromptComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/dynamicdialog */ "J7/z");
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/inputtext */ "7kUa");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/button */ "jIHw");





class PromptComponent {
    constructor(formBuilder, ref) {
        this.formBuilder = formBuilder;
        this.ref = ref;
    }
    ngOnInit() {
        this.group = this.formBuilder.group({
            typed: ['']
        });
    }
    close() {
        const typed = this.group.get('typed').value;
        this.group.get('typed').reset('');
        this.ref.close(typed);
    }
}
PromptComponent.ɵfac = function PromptComponent_Factory(t) { return new (t || PromptComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_2__["DynamicDialogRef"])); };
PromptComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PromptComponent, selectors: [["app-prompt"]], decls: 5, vars: 2, consts: [[3, "formGroup", "ngSubmit"], ["formControlName", "typed", "type", "text", "pInputText", "", 3, "autofocus"], [1, "p-flex-row"], ["type", "button", "label", "Close", "pButton", "", 1, "p-ml-auto", 3, "click"], ["type", "submit", "label", "Submit", "pButton", "", 1, "p-ml-2", "p-mr-2"]], template: function PromptComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function PromptComponent_Template_form_ngSubmit_0_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PromptComponent_Template_button_click_3_listener() { return ctx.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.group);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autofocus", true);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], primeng_inputtext__WEBPACK_IMPORTED_MODULE_3__["InputText"], primeng_button__WEBPACK_IMPORTED_MODULE_4__["ButtonDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9tcHQuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "2mVW":
/*!*********************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/bst-cell-drawing.ts ***!
  \*********************************************************************/
/*! exports provided: BstCellDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BstCellDrawing", function() { return BstCellDrawing; });
class BstCellDrawing {
    // colorProvider: ColorProvider;
    //
    // constructor(colorProvider: ColorProvider) {
    //   this.colorProvider = colorProvider;
    // }
    enter(enterElement) {
        const bstCell = enterElement.append('g')
            .attr('class', 'bst-cell')
            .attr('transform', (d) => `translate(${d.x}, ${d.y})`);
        bstCell
            .append('circle')
            .attr('class', 'bst-cell-circle')
            // .on('mouseover', (d, i, nodes) => this.nodeMouseOver(d, i, nodes))
            // .on('mouseout', (d, i, nodes) => this.nodeMouseOut(d, i, nodes))
            // .on('contextmenu', contextMenu(this.getContextMenu()))
            .attr('fill', d => d.isValid ? '#E2E8CE' : '#e8cece')
            .style('opacity', .9)
            .style('cursor', 'pointer')
            .attr('r', d => d.radius)
            .style('stroke-opacity', 1)
            .style('stroke-width', 0)
            .style('stroke', '#9381FF');
        bstCell
            .append('text')
            .attr('class', 'bst-cell-empty')
            .attr('dx', 0)
            .attr('dy', 40 / 8)
            .style('text-anchor', 'middle')
            .attr('pointer-events', 'none')
            .attr('font-size', 0)
            .raise()
            .style('fill', d => d.graph.isValid ? d.descriptorColor : '#860000')
            .text(d => d.graph.isValid ? 'empty' : 'invalid')
            .transition()
            .duration(500)
            .attr('font-size', 16);
        bstCell
            .append('text')
            .style('fill', 'white')
            .attr('class', 'bst-cell-name')
            .attr('dx', 0)
            .attr('dy', d => -d.radius * 1.2)
            .style('text-anchor', 'middle')
            .attr('pointer-events', 'none')
            .attr('font-size', 32)
            .style('opacity', d => !d.descriptor ? 0 : 1)
            .text(d => !d.descriptor ? '' : d.descriptor);
        return bstCell;
    }
    update(updateElement) {
        updateElement
            .select('.bst-cell-circle')
            .attr('fill', d => !d.graph.isValid ? '#e8cece' : d.color);
        updateElement
            .select('.bst-cell-name')
            .style('opacity', d => !d.descriptor ? 0 : 1)
            .text(d => !d.descriptor ? '' : d.descriptor);
        updateElement
            .select('.bst-cell-empty')
            .style('fill', d => d.graph.isValid ? d.descriptorColor : '#860000')
            .text(d => d.graph.isValid ? 'empty' : 'invalid');
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
}


/***/ }),

/***/ "30CF":
/*!***********************************************************!*\
  !*** ./src/app/core/simulation/helpers/drag/node-drag.ts ***!
  \***********************************************************/
/*! exports provided: NodeDrag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeDrag", function() { return NodeDrag; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class NodeDrag {
    constructor(simulation) {
        this.previouslyHoveredPlaceholders = [];
        this.simulation = simulation;
    }
    dragStart(d, i, nodes) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('*').style('cursor', 'grabbing');
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](nodes[i]).raise();
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('line').attr('pointer-events', 'none'); // remove hovering from all lines
        d.noCollision = true;
        d.pointerEvents = false;
        d.nodeOrder = 0;
        d.dragStartX = d.x;
        d.dragStartY = d.y;
        d.move(d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
        // d.setTransform(d3.event.x, d3.event.y);
    }
    dragging(d, i, nodes) {
        d.move(d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
        // d.setTransform(d3.event.x, d3.event.y);
        this.simulation.loop.draggedNode = d;
    }
    dragEnd(d, i, nodes) {
        // if (!d) {
        //
        //   d3.selectAll('line').attr('pointer-events', 'auto');
        //   d3.selectAll('.node').attr('pointer-events', 'auto');
        //   this.simulation.loop.draggedNode = null;
        //   return;
        // }
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('*').style('cursor', null);
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('line').attr('pointer-events', 'auto');
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.node').attr('pointer-events', 'auto');
        const distanceDragged = Math.sqrt(Math.pow(d3__WEBPACK_IMPORTED_MODULE_0__["event"].x - d.dragStartX, 2) + Math.pow(d3__WEBPACK_IMPORTED_MODULE_0__["event"].y - d.dragStartY, 2));
        if (distanceDragged < 30 && !d.lockedGrid && !d.lockedPlaceholder) {
            // short drag, do nothing
            this.freeUpNode(d);
            this.simulation.loop.draggedNode = null;
            return;
        }
        if (this.simulation.loop.draggedNode) {
            const arrayCell = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.array-cell-container')
                .data()
                .filter((ac) => ac.isMouseOver)[0]; // select array cell where mouse is hovering over
            if (arrayCell) {
                // is mouse hovering over an arraycell
                if (!arrayCell.node) {
                    if (d.lockedGrid) {
                        d.lockedGrid.removeNode();
                    }
                    arrayCell.addNode(d);
                    // this.simulation.simulationLoop.repaint();
                }
                else if (arrayCell.node !== d) {
                    // if (d.lockedGrid) {
                    //   d.lockedGrid.removeNode();
                    //   // this.simulation.simulationLoop.repaint();
                    // }
                    // arrayCell.removeNode();
                    // arrayCell.addNode(d);
                }
            }
            else {
                if (d.lockedGrid) {
                    d.lockedGrid.removeNode();
                    // this.simulation.simulationLoop.repaint();
                }
                d.fx = undefined;
                d.fy = undefined;
            }
            const bstCell = d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.bst-cell-circle')
                .data()
                .filter((bc) => bc.isMouseOver)[0];
            if (bstCell &&
                !bstCell.node &&
                bstCell.graph.isValid &&
                (!d.lockedPlaceholder || bstCell.graph !== d.lockedPlaceholder.graph)) {
                bstCell.graph.add(d, bstCell);
            }
        }
        d.setTarget(d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('line').attr('pointer-events', 'auto');
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('.node').attr('pointer-events', 'auto');
        this.freeUpNode(d);
        this.simulation.loop.draggedNode = null;
    }
    addDragInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        const drag = d3__WEBPACK_IMPORTED_MODULE_0__["drag"]()
            .on('start', (d, i, nodes) => this.dragStart(d, i, nodes))
            .on('drag', (d, i, nodes) => this.dragging(d, i, nodes))
            .on('end', (d, i, nodes) => this.dragEnd(d, i, nodes));
        element.call(drag);
        return element;
    }
    freeUpNode(d) {
        if (!d.lockedGrid && !d.lockedPlaceholder) {
            d.noCollision = false;
            d.pointerEvents = true;
            d.nodeOrder = 1;
            d.fx = undefined;
            d.fy = undefined;
        }
        else if (d.lockedGrid) {
            d.noCollision = true;
            d.pointerEvents = true;
            d.nodeOrder = 2;
            d.move(d.lockedGrid.parent.x + d.lockedGrid.x + d.lockedGrid.width / 2, d.lockedGrid.height / 2 + d.lockedGrid.parent.y);
        }
        else if (d.lockedPlaceholder) {
            d.noCollision = true;
            d.pointerEvents = false;
            d.nodeOrder = 2;
        }
    }
}


/***/ }),

/***/ "3Aa0":
/*!***********************************************************!*\
  !*** ./src/app/core/simulation/handlers/array-handler.ts ***!
  \***********************************************************/
/*! exports provided: ArrayHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayHandler", function() { return ArrayHandler; });
/* harmony import */ var _structures_array_simulation_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structures/array/simulation-array */ "oN2I");

class ArrayHandler {
    constructor(simulation, drawingHelper, arrayCellDrawingHelper, dragHelper, mouseHelper, arrayCellMouseHelper, canvas) {
        this.maxId = 0;
        this.data = [];
        this.drawingHelper = drawingHelper;
        this.arrayCellDrawingHelper = arrayCellDrawingHelper;
        this.dragHelper = dragHelper;
        this.mouseHelper = mouseHelper;
        this.arrayCellMouseHelper = arrayCellMouseHelper;
        this.simulation = simulation;
        this.canvas = canvas;
    }
    add(obj) {
        if (!(obj instanceof _structures_array_simulation_array__WEBPACK_IMPORTED_MODULE_0__["SimulationArray"])) {
            return;
        }
        const array = obj;
        array.id = this.maxId++;
        this.data.push(array);
    }
    draw() {
        const arrayElements = this.canvas
            .selectAll('.array')
            .data(this.data, (arr) => arr.id)
            .join(enterElement => this.enter(enterElement), updateElement => this.update(updateElement), exitElement => this.exit(exitElement));
        arrayElements.lower();
    }
    enter(enterElement) {
        const arrElement = this.drawingHelper.enter(enterElement);
        this.mouseHelper.addMouseInteraction(arrElement);
        this.dragHelper.addDragInteraction(arrElement);
        arrElement
            .selectAll('.array-cell')
            .data((d) => d.data, (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.arrayCellDrawingHelper.enter(enterCell);
            this.arrayCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        });
        return arrElement;
    }
    update(updateElement) {
        this.drawingHelper.update(updateElement);
        updateElement
            .selectAll('.array-cell')
            .data((d) => d.data, (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.arrayCellDrawingHelper.enter(enterCell);
            this.arrayCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        }, updateCell => this.arrayCellDrawingHelper.update(updateCell), exitCell => this.arrayCellDrawingHelper.exit(exitCell));
        return updateElement;
    }
    exit(exitElement) {
        return this.drawingHelper.exit(exitElement);
    }
    reset() {
        this.maxId = 0;
        this.data = [];
    }
}


/***/ }),

/***/ "3B/d":
/*!***************************************************!*\
  !*** ./src/app/core/simulation/object-factory.ts ***!
  \***************************************************/
/*! exports provided: ObjectFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectFactory", function() { return ObjectFactory; });
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basics/simulation-node */ "Q48m");
/* harmony import */ var _structures_array_simulation_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./structures/array/simulation-array */ "oN2I");
/* harmony import */ var _structures_tree_binary_tree_binary_search_tree_binary_search_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structures/tree/binary-tree/binary-search-tree/binary-search-tree */ "LVtG");
/* harmony import */ var _structures_tree_binary_tree_avl_tree_avl_tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./structures/tree/binary-tree/avl-tree/avl-tree */ "pOMU");
/* harmony import */ var _structures_tree_binary_tree_red_black_tree_red_black_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./structures/tree/binary-tree/red-black-tree/red-black-tree */ "Vz4i");
/* harmony import */ var _structures_tree_binary_tree_heap_heap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./structures/tree/binary-tree/heap/heap */ "bLjw");
/* harmony import */ var _structures_tree_linked_list_linked_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./structures/tree/linked-list/linked-list */ "msOR");
/* harmony import */ var _structures_array_simulation_stack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./structures/array/simulation-stack */ "Nx3Y");
/* harmony import */ var _structures_array_simulation_queue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./structures/array/simulation-queue */ "UMtZ");









class ObjectFactory {
    create(type, x, y, value) {
        switch (type.toLowerCase()) {
            case 'node':
                return this.createNode(x, y, value);
            case 'array':
                return this.createArray(x, y, value);
            case 'bst':
                return this.createBst(x, y);
            case 'avl':
                return this.createAvl(x, y);
            case 'rb':
                return this.createRb(x, y);
            case 'heap':
                return this.createHeap(x, y);
            case 'singlylinkedlist':
                return this.createSinglyLinkedList(x, y);
            case 'stack':
                return this.createStack(x, y, value);
            case 'queue':
                return this.createQueue(x, y, value);
        }
    }
    createNode(x, y, value) {
        return new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_0__["SimulationNode"](value !== null && value !== void 0 ? value : 0, -1, x, y);
    }
    createArray(x, y, value) {
        const arr = new _structures_array_simulation_array__WEBPACK_IMPORTED_MODULE_1__["SimulationArray"](-1, x, y);
        arr.setCapacity(value !== null && value !== void 0 ? value : 10);
        return arr;
    }
    createStack(x, y, value) {
        const stack = new _structures_array_simulation_stack__WEBPACK_IMPORTED_MODULE_7__["SimulationStack"](-1, x, y);
        stack.setCapacity(value !== null && value !== void 0 ? value : 10);
        return stack;
    }
    createQueue(x, y, value) {
        const queue = new _structures_array_simulation_queue__WEBPACK_IMPORTED_MODULE_8__["SimulationQueue"](-1, x, y);
        queue.setCapacity(value !== null && value !== void 0 ? value : 10);
        return queue;
    }
    createBst(x, y) {
        return new _structures_tree_binary_tree_binary_search_tree_binary_search_tree__WEBPACK_IMPORTED_MODULE_2__["BinarySearchTree"](-1, x, y);
    }
    createAvl(x, y, value) {
        return new _structures_tree_binary_tree_avl_tree_avl_tree__WEBPACK_IMPORTED_MODULE_3__["AvlTree"](-1, x, y);
    }
    createRb(x, y, value) {
        return new _structures_tree_binary_tree_red_black_tree_red_black_tree__WEBPACK_IMPORTED_MODULE_4__["RedBlackTree"](-1, x, y);
    }
    createHeap(x, y, value) {
        return new _structures_tree_binary_tree_heap_heap__WEBPACK_IMPORTED_MODULE_5__["Heap"](-1, x, y);
    }
    createSinglyLinkedList(x, y, value) {
        return new _structures_tree_linked_list_linked_list__WEBPACK_IMPORTED_MODULE_6__["LinkedList"](-1, x, y);
    }
}


/***/ }),

/***/ "3REL":
/*!***********************************************************************!*\
  !*** ./src/scenarios/binary-search-tree/scenes/deletion-one-child.ts ***!
  \***********************************************************************/
/*! exports provided: DeletionOneChild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionOneChild", function() { return DeletionOneChild; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionOneChild {
    constructor() {
        this.id = 5;
        this.played = 'not_played';
        this.toRemove = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(8);
            nodes.sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('bst', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
            this.toRemove = nodes[3].value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.delete(this.toRemove);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion - One child</h1>
  <p>
    It's quite complicated to delete an element from a binary search tree. There are
    three cases:
  </p>
  <ol>
    <li>
      <small>The node we're deleting</small> doesn't have any children (its children are empty leaves);
    </li>
    <li>
      <b><small>The node we're deleting</small> has only one child (the other one is an empty leaf);</b>
    </li>
    <li>
      <small>The node we're deleting</small> has two children.
    </li>
  </ol>
  <p>
    Now, let's see the second case and remove the node with value ${this.toRemove}.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    This case was a little bit more complicated than the previous one. Here, the node was deleted and
    and its child took the node's place, that is parent of the <em>target</em> node now has child
    of the <em>target</em> node set as its own child.
  </p>
    `;
    }
}


/***/ }),

/***/ "3cFF":
/*!******************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/array-drawing.ts ***!
  \******************************************************************/
/*! exports provided: ArrayDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayDrawing", function() { return ArrayDrawing; });
class ArrayDrawing {
    enter(enterElement) {
        const arrayElement = enterElement.append('g')
            .attr('class', 'array')
            .attr('transform', arr => `translate(${arr.x}, ${arr.y})`)
            .style('cursor', 'pointer');
        arrayElement
            .append('rect')
            .attr('class', 'array-bg')
            .attr('x', -25)
            .attr('y', -60)
            .attr('width', (arr) => arr.capacity * (arr.cellWidth + arr.cellWidth / 20) + 45)
            .attr('height', 200)
            .attr('rx', 25)
            .attr('ry', 25)
            .style('stroke', 'white')
            .style('stroke-width', 2)
            .attr('fill', (arr) => arr.color)
            .style('opacity', .8)
            .lower();
        arrayElement
            .append('text')
            .attr('class', 'array-title')
            .attr('dx', arr => (arr.capacity * arr.cellWidth) / 2)
            .attr('dy', -25)
            .text(arr => `${arr.descriptor}${arr.sorted ? ' (sorted)' : ''}`)
            .attr('font-size', 30)
            .style('fill', 'white')
            .style('text-anchor', 'middle')
            .attr('pointer-events', 'none');
        return arrayElement;
    }
    update(updateElement) {
        updateElement
            .select('.array-bg')
            .attr('width', (arr) => arr.capacity * (arr.cellWidth + arr.cellWidth / 20) + 45)
            .lower();
        updateElement
            .select('.array-title')
            .attr('dx', arr => (arr.capacity * arr.cellWidth) / 2)
            .text(arr => `${arr.descriptor}${arr.sorted ? ' (sorted)' : ''}`);
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
}


/***/ }),

/***/ "4+bX":
/*!************************************************************!*\
  !*** ./src/scenarios/stack-queue/scenes/circular-queue.ts ***!
  \************************************************************/
/*! exports provided: CircularQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircularQueue", function() { return CircularQueue; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class CircularQueue {
    constructor() {
        this.id = 6;
        this.played = 'not_played';
        this.elements = '';
        this.queueSize = -1;
        this.firstValue = -1;
        this.lastValue = -1;
        this.toEnqueue = 23.11;
        this.capacity = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.queue = simulation.objectFactory.create('queue', 0, 0, 10);
            simulation.arrayHandler.add(this.queue);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.queue.insertAt(nodes[i], i + this.queue.capacity - nodes.length, false);
            }
            yield this.queue.setLeft(this.queue.capacity - nodes.length, false);
            this.capacity = this.queue.capacity;
            yield this.queue.setRight(this.queue.capacity - 1, false);
            this.firstValue = this.queue.left.node.value;
            this.lastValue = this.queue.right.node.value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.toEnqueue, -1, this.queue.x, this.queue.y - 200);
            simulation.nodeHandler.add(node);
            yield this.queue.enqueue(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Queue - Circular queue</h1>
  <p>
    Take a look at that array on the right-hand side. That's the queue implementation.
  </p>
  <p>
    The first element of the queue is <span style="color: #a0ff6f; font-weight: bold">${this.firstValue}</span>,
    and the last element is <span style="color: #ff9494; font-weight: bold">${this.lastValue}</span>.
  </p>
  <p>
    Current queue configuration was achieved using consecutive enqueue and dequeue operations,
    without moving elements to the left when dequeueing.
  </p>
  <p>
    Now, utilizing the previously learned way of appending element ${this.toEnqueue}
    to the end of the array won't work. Even though the array itself isn't completely full,
    we can't simply add an element to it.
  </p>
  <p>
    That is why a circular variant of the queue is implemented. Now, we're not simply adding
    an element to the end of array. Instead, imagine we're checking if the last element is at the last index
    of the array. If it is, we'll check if there is empty space at the beginning of the array and out new last element
    will be placed there this time.
  </p>
  <p>
    Only, we can avoid that checking if the last element is at the last index, and simply insert
    our new element (which will be denoted as the last element of the queue) at the index
    [(i + 1) % N] where <em>i</em> is index of the last element of the queue and N is capacity of the array.
  </p>
  <p>
    Moreover, we can avoid that checking process and simply insert
    our new element (which will be denoted as the last element of the queue) at the index
    [(i + 1) % N] where <em>i</em> is index of the last element of the queue and N is capacity of the array.
  </p>
  <p>
    Let's see how this works by enqueueing ${this.toEnqueue}.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    After successfully enqueueing the value ${this.toEnqueue}, it has became the new last element.
  </p>
  <small>
    The same principle goes for dequeueing as well, where the first element would
    be placed at the index [0] after dequeueing an element from the index [${this.capacity}].
  </small>
    `;
    }
}


/***/ }),

/***/ "4nPk":
/*!*****************************************************************!*\
  !*** ./src/app/core/simulation/handlers/linked-list-handler.ts ***!
  \*****************************************************************/
/*! exports provided: LinkedListHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedListHandler", function() { return LinkedListHandler; });
class LinkedListHandler {
    constructor(simulation, dragHelper, drawingHelper, mouseHelper, bstCellDrawingHelper, bstCellDragHelper, bstCellMouseHelper, linkDrawingHelper, canvas) {
        this.data = [];
        this.maxId = 0;
        this.simulation = simulation;
        this.dragHelper = dragHelper;
        this.drawingHelper = drawingHelper;
        this.mouseHelper = mouseHelper;
        this.bstCellDrawingHelper = bstCellDrawingHelper;
        this.bstCellDragHelper = bstCellDragHelper;
        this.bstCellMouseHelper = bstCellMouseHelper;
        this.linkDrawingHelper = linkDrawingHelper;
        this.canvas = canvas;
    }
    add(tree) {
        tree.id = this.maxId++;
        tree.init();
        this.data.push(tree);
    }
    draw() {
        const treeElements = this.canvas
            .selectAll('.linked-list')
            .data(this.data, (tree) => tree.id)
            .join(enterElement => this.enter(enterElement), updateElement => this.update(updateElement), exitElement => this.exit(exitElement));
        treeElements.lower();
    }
    enter(enterElement) {
        const treeElement = this.drawingHelper.enter(enterElement);
        this.mouseHelper.addMouseInteraction(treeElement);
        treeElement
            .selectAll('.bst-cell')
            .data((d) => d.getData(), (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.bstCellDrawingHelper.enter(enterCell);
            this.bstCellDragHelper.addDragInteraction(cellElement);
            this.bstCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        });
        treeElement
            .selectAll('.link')
            .data((d) => d.getLinks(), (link) => `${link.target.id}_${link.target.id}`)
            .join(enterLink => {
            const linkElement = this.linkDrawingHelper.enter(enterLink);
            linkElement.lower();
            return linkElement;
        });
        return treeElement;
    }
    update(updateElement) {
        this.drawingHelper.update(updateElement);
        updateElement
            .selectAll('.bst-cell')
            .data((d) => d.getData(), (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.bstCellDrawingHelper.enter(enterCell);
            this.bstCellDragHelper.addDragInteraction(cellElement);
            this.bstCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        }, updateCell => this.bstCellDrawingHelper.update(updateCell), exitCell => this.bstCellDrawingHelper.exit(exitCell));
        updateElement
            .selectAll('.link')
            .data((d) => d.getLinks(), (link) => `${link.source.id}_${link.target.id}`)
            .join(enterLink => {
            const linkElement = this.linkDrawingHelper.enter(enterLink);
            linkElement.lower();
            return linkElement;
        }, updateLink => this.linkDrawingHelper.update(updateLink).lower(), exitLink => this.linkDrawingHelper.exit(exitLink));
        return updateElement;
    }
    exit(exitElement) {
        return this.drawingHelper.exit(exitElement);
    }
    reset() {
        this.maxId = 0;
        this.data = [];
    }
}


/***/ }),

/***/ "5WNV":
/*!****************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/quick-sort.ts ***!
  \****************************************************************/
/*! exports provided: QuickSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickSort", function() { return QuickSort; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class QuickSort {
    sort(arr) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.quickSort(arr, arr.data.slice(0, arr.size), 0, arr.size - 1);
        });
    }
    quickSort(arr, data, low, high) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (low < high) {
                data.slice(low, high + 1).forEach(c => c.highlight('#ff6257'));
                yield new Promise(r => setTimeout(r, 1200));
                data.slice(low, high + 1).forEach(c => c.resetColor());
                yield new Promise(r => setTimeout(r, 600));
                const pivot = yield this.partition(arr, data, low, high);
                yield this.quickSort(arr, data, low, pivot - 1);
                yield this.quickSort(arr, data, pivot, high);
            }
        });
    }
    partition(arr, data, low, high) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const pivot = data[high];
            const pivotNode = pivot.removeNode();
            pivotNode.setTarget(pivot.absoluteX, pivot.absoluteY + 100);
            pivot.highlight('#ff8441');
            yield new Promise(r => setTimeout(r, 600));
            let i = low - 1;
            for (let j = low; j < high; ++j) {
                data[j].highlight('#fdd828');
                yield new Promise(r => setTimeout(r, 600));
                if (data[j].node.value <= pivotNode.value) {
                    if (i >= 0) {
                        data[i].resetColor();
                    }
                    ++i;
                    data[i].highlight('#41d9ff');
                    yield new Promise(r => setTimeout(r, 600));
                    if (i !== j) {
                        yield arr.swapNodes(data[i], data[j]);
                    }
                }
                if (i !== j) {
                    data[j].resetColor();
                }
                else {
                    data[j].highlight('#41d9ff');
                }
            }
            if (i >= 0) {
                data[i].resetColor();
            }
            pivot.resetColor();
            if (i + 1 !== high) {
                yield arr.moveNode(data[i + 1], data[high]);
            }
            pivotNode.setTarget(data[i + 1].absoluteX, data[i + 1].absoluteY);
            yield new Promise(r => setTimeout(r, 600));
            data[i + 1].addNode(pivotNode);
            return i + 1;
        });
    }
}


/***/ }),

/***/ "5rxo":
/*!********************************************!*\
  !*** ./src/scenarios/sort/scenes/quick.ts ***!
  \********************************************/
/*! exports provided: Quick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quick", function() { return Quick; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_structures_array_quick_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/structures/array/quick-sort */ "5WNV");


class Quick {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.array.sorting = new _app_core_simulation_structures_array_quick_sort__WEBPACK_IMPORTED_MODULE_1__["QuickSort"]();
            yield this.array.sort();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Quick sort</h1>
  <p>Quicksort is a sorting algorithm based on the divide and conquer approach where</p>

  <p>An array is divided into subarrays by selecting a pivot element (element selected from the array).</p>

  <p>While dividing the array, the pivot element should be positioned in such a way that elements less than pivot are kept on the left side and elements greater than pivot are on the right side of the pivot.
  The left and right subarrays are also divided using the same approach. This process continues until each subarray contains a single element.</p>

  <p>At this point, elements are already sorted. Finally, elements are combined to form a sorted array.</p>
  <p>
    Press play to sort the elements
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Although the worst case time complexity of QuickSort is O(n<sup>2</sup>) which is more
    than many other sorting algorithms like Merge Sort and Heap Sort, QuickSort is faster
    in practice, because its inner loop can be efficiently implemented on
    most architectures, and in most real-world data. QuickSort can be implemented
    in different ways by changing the choice of pivot, so that the worst case rarely
    occurs for a given type of data. However, merge sort is generally considered better
    when data is huge and stored in external storage.
  </p>
    `;
    }
}


/***/ }),

/***/ "615e":
/*!********************************!*\
  !*** ./src/app/core/camera.ts ***!
  \********************************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");


class Camera {
    constructor(svg, canvas, widthHeight) {
        this.transitionDuration = 2000;
        this.widthHeight = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([0, 0]);
        this.svg = svg;
        this.canvas = canvas;
        this.widthHeight.next(widthHeight);
    }
    setZoom() {
        if (!this.zoom) {
            this.zoom = d3__WEBPACK_IMPORTED_MODULE_0__["zoom"]()
                .translateExtent([[-10000, -10000], [10000, 10000]])
                .scaleExtent([0.3, 3])
                .on('zoom', () => {
                const e = d3__WEBPACK_IMPORTED_MODULE_0__["event"];
                if (!e) {
                    return;
                }
                // @ts-ignore
                this.canvas.attr('transform', e.transform);
            });
        }
        this.svg.call(this.zoom);
    }
    focusSvg() {
        const [width, height] = this.widthHeight.getValue();
        this.svg
            .transition()
            .duration(this.transitionDuration)
            .call(this.zoom.transform, d3__WEBPACK_IMPORTED_MODULE_0__["zoomIdentity"].translate(width / 2, height / 2).scale(.4));
    }
    focus(element) {
        const bbox = element.node().getBBox();
        const [width, height] = this.widthHeight.getValue();
        const midX = (2 * bbox.x + bbox.width) / 2;
        const midY = (2 * bbox.y + bbox.height) / 2;
        const scale = 0.9 / Math.max(bbox.width / width, bbox.height / height);
        const center = [width / 2 - scale * midX, height / 2 - scale * midY];
        console.log(bbox);
        console.log(scale);
        console.log(center);
        if (scale > 3) {
            console.log('DAVIDJU');
            console.log(center);
            console.log(scale);
            console.log(element);
            return;
        }
        this.svg
            .transition()
            .duration(this.transitionDuration)
            .call(this.zoom.transform, d3__WEBPACK_IMPORTED_MODULE_0__["zoomIdentity"].translate(center[0], center[1]).scale(scale));
    }
}


/***/ }),

/***/ "6Ccv":
/*!***************************************************************!*\
  !*** ./src/scenarios/linked-list/scenes/linked-list-scene.ts ***!
  \***************************************************************/
/*! exports provided: LinkedListScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedListScene", function() { return LinkedListScene; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class LinkedListScene {
    constructor() {
        this.id = 0;
        this.played = 'unplayable';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            const list = simulation.objectFactory.create('singlyLinkedList', 0, 0);
            simulation.linkedListHandler.add(list);
            for (const node of nodes) {
                yield list.append(node, false);
            }
        });
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Linked list</h1>
  <p>
    Liked list represents a sequence of connected elements in form of nodes.
  </p>
  <p>
    Each node contains:
  </p>
  <ul>
    <li>
      Data (a value which it holds);
    </li>
    <li>
      Link towards the next node in the sequence;
    </li>
    <li>
      Link towards the previous node in the sequence
      <small>If it's a doubly linked list</small>.
    </li>
  </ul>
  <p>
    There is one reference to the first node in the list, and it is called <em>head</em>,
    as well as one reference to the last node in the list, and it is called <em>tail</em>.
  </p>
  <p>
    Every node is referencing its only successor, and the last node
    does not have a link to any node.
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "7t2/":
/*!**************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/array-mouse.ts ***!
  \**************************************************************/
/*! exports provided: ArrayMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayMouse", function() { return ArrayMouse; });
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-context-menu */ "Ttfg");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(d3_context_menu__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _structures_array_simulation_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../structures/array/simulation-stack */ "Nx3Y");
/* harmony import */ var _stack_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stack-menu */ "T8p/");
/* harmony import */ var _structures_array_simulation_queue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../structures/array/simulation-queue */ "UMtZ");
/* harmony import */ var _queue_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./queue-menu */ "sjC/");
/* harmony import */ var _array_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./array-menu */ "RPKT");






class ArrayMouse {
    constructor(simulation) {
        this.simulation = simulation;
    }
    contextMenu(d, i, arrays) {
        let menu;
        if (d instanceof _structures_array_simulation_stack__WEBPACK_IMPORTED_MODULE_1__["SimulationStack"]) {
            menu = Object(_stack_menu__WEBPACK_IMPORTED_MODULE_2__["stackMenu"])(this.simulation);
        }
        else if (d instanceof _structures_array_simulation_queue__WEBPACK_IMPORTED_MODULE_3__["SimulationQueue"]) {
            menu = Object(_queue_menu__WEBPACK_IMPORTED_MODULE_4__["queueMenu"])(this.simulation);
        }
        else {
            menu = Object(_array_menu__WEBPACK_IMPORTED_MODULE_5__["arrayMenu"])(this.simulation);
        }
        d3_context_menu__WEBPACK_IMPORTED_MODULE_0___default()(menu)(d, i);
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element
            // .on('mouseover', (d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
            // .on('mouseout', (d: SimulationArray, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
            .on('contextmenu', (d, i, arrays) => this.contextMenu(d, i, arrays));
        return element;
    }
}


/***/ }),

/***/ "8Gdb":
/*!*********************************************************!*\
  !*** ./src/app/view/playground/playground.component.ts ***!
  \*********************************************************/
/*! exports provided: PlaygroundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaygroundComponent", function() { return PlaygroundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _core_simulation_helpers_arrowhead_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/simulation/helpers/arrowhead-helper */ "H8PZ");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _prompt_prompt_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prompt/prompt.component */ "1yNI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _core_services_scenario_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/services/scenario.service */ "Z/hl");
/* harmony import */ var _core_services_scene_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/services/scene.service */ "1fSV");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/api */ "7zfz");
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dynamicdialog */ "J7/z");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var primeng_ripple__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/ripple */ "Q4Mo");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/button */ "jIHw");
/* harmony import */ var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/overlaypanel */ "z8Lm");
/* harmony import */ var primeng_skeleton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/skeleton */ "jeV5");
/* harmony import */ var primeng_inputnumber__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/inputnumber */ "Ks7X");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var primeng_slider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/slider */ "+la4");



















const _c0 = ["canvas"];
const _c1 = ["skeleton"];
const _c2 = function () { return { width: "100%", height: "100%" }; };
function PlaygroundComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", null, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "p-skeleton", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](2, _c2));
} }
function PlaygroundComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p-inputNumber", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function PlaygroundComponent_ng_template_9_Template_p_inputNumber_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r5.speed = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "p-slider", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function PlaygroundComponent_ng_template_9_Template_p_slider_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r7.speed = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("min", 0.5)("max", 3)("minFractionDigits", 1)("maxFractionDigits", 1)("ngModel", ctx_r3.speed);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("min", 0.5)("max", 3)("step", 0.1)("ngModel", ctx_r3.speed);
} }
const _c3 = function (a1) { return { width: "100%", height: a1 }; };
class PlaygroundComponent {
    constructor(router, scenarioService, sceneService, messageService, dialogService) {
        this.router = router;
        this.scenarioService = scenarioService;
        this.sceneService = sceneService;
        this.messageService = messageService;
        this.dialogService = dialogService;
        this._speed = 1;
        this.isVisualizationLoading = true;
        this.widthHeight = [0, 0];
    }
    ngAfterViewInit() {
        setTimeout(() => this.init(), 600);
    }
    init() {
        this.widthHeight = [window.innerWidth, window.innerHeight - 70];
        this.setupSvg();
        const g = this.svg
            .append('g')
            .attr('class', 'canvas');
        this.scenarioService.initSimulation(g, this.widthHeight, this.promptString(this.dialogService));
        this.scenarioService.startSimulation(this.svg);
        this.scenarioService.simulation.camera.focusSvg();
        this.sceneService.scene.subscribe((sc) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isVisualizationLoading = true;
            if (!!sc) {
                yield sc.setup(this.scenarioService.simulation);
            }
            this.isVisualizationLoading = false;
        }));
    }
    setupSvg() {
        this.svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.canvasElement.nativeElement).append('svg')
            .attr('id', 'svgCanvas')
            .attr('height', this.widthHeight[1])
            .attr('width', this.widthHeight[0])
            .style('background', '#282828');
        _core_simulation_helpers_arrowhead_helper__WEBPACK_IMPORTED_MODULE_2__["ArrowheadHelper"].addArrowhead(this.svg);
        this.svg.append('filter')
            .attr('id', 'blur')
            .append('feGaussianBlur')
            .attr('stdDeviation', 5);
    }
    onResize() {
        this.widthHeight = [window.innerWidth, window.innerHeight - 70];
        d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#svgCanvas')
            .attr('height', this.widthHeight[1])
            .attr('width', this.widthHeight[0]);
        this.scenarioService.updateWidthHeight(this.widthHeight);
    }
    promptString(dialogService) {
        return (header) => {
            const ref = dialogService.open(_prompt_prompt_component__WEBPACK_IMPORTED_MODULE_4__["PromptComponent"], {
                header,
                baseZIndex: 1000,
            });
            return ref.onClose.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).toPromise();
        };
    }
    get speed() {
        return this._speed;
    }
    set speed(val) {
        this._speed = val;
    }
}
PlaygroundComponent.ɵfac = function PlaygroundComponent_Factory(t) { return new (t || PlaygroundComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_scenario_service__WEBPACK_IMPORTED_MODULE_7__["ScenarioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_scene_service__WEBPACK_IMPORTED_MODULE_8__["SceneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_9__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_10__["DialogService"])); };
PlaygroundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PlaygroundComponent, selectors: [["app-playground"]], viewQuery: function PlaygroundComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.canvasElement = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.skeletonElement = _t.first);
    } }, hostBindings: function PlaygroundComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("resize", function PlaygroundComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresolveWindow"]);
    } }, decls: 10, vars: 6, consts: [[1, "visualization-content"], ["canvas", ""], [3, "style", 4, "ngIf"], [1, "visualization-footer"], [1, "p-d-flex", "p-flex-row"], ["icon", "pi pi-clock", "label", "Speed", "pRipple", "", "pButton", "", 1, "p-button", "p-button-info", "p-button-icon", "p-button-rounded", "p-mb-2", 3, "click"], ["appendTo", "body", 3, "showCloseIcon"], ["op", ""], ["pTemplate", ""], ["skeleton", ""], ["width", "100%", "height", "100%"], ["mode", "decimal", 3, "min", "max", "minFractionDigits", "maxFractionDigits", "ngModel", "ngModelChange"], [3, "min", "max", "step", "ngModel", "ngModelChange"]], template: function PlaygroundComponent_Template(rf, ctx) { if (rf & 1) {
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, PlaygroundComponent_div_3_Template, 3, 3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PlaygroundComponent_Template_button_click_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](8); return _r2.toggle($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "p-overlayPanel", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, PlaygroundComponent_ng_template_9_Template, 2, 9, "ng-template", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](4, _c3, ctx.isVisualizationLoading ? 0 : "100%"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isVisualizationLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("showCloseIcon", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], primeng_ripple__WEBPACK_IMPORTED_MODULE_12__["Ripple"], primeng_button__WEBPACK_IMPORTED_MODULE_13__["ButtonDirective"], primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_14__["OverlayPanel"], primeng_api__WEBPACK_IMPORTED_MODULE_9__["PrimeTemplate"], primeng_skeleton__WEBPACK_IMPORTED_MODULE_15__["Skeleton"], primeng_inputnumber__WEBPACK_IMPORTED_MODULE_16__["InputNumber"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["NgModel"], primeng_slider__WEBPACK_IMPORTED_MODULE_18__["Slider"]], styles: [".visualization-content[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.visualization-footer[_ngcontent-%COMP%] {\n  position: absolute;\n  padding-top: 1rem;\n  background-color: #2f2f2f;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  bottom: 0;\n  width: 100%;\n  height: auto;\n}\n\n.visualize-button[_ngcontent-%COMP%] {\n  font-size: .7rem;\n  font-weight: 500;\n  margin: 2px;\n  padding: 2px;\n}\n\n  .canvas {\n  font-family: 'Courier New', sans-serif;\n  font-weight: 500;\n}\n\n  .canvas text {\n  -webkit-user-select: none;\n          user-select: none;\n  pointer-events: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXlncm91bmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsNkJBQTZCO0VBQzdCLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx5QkFBaUI7VUFBakIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtBQUN0QiIsImZpbGUiOiJwbGF5Z3JvdW5kLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudmlzdWFsaXphdGlvbi1jb250ZW50IHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udmlzdWFsaXphdGlvbi1mb290ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHBhZGRpbmctdG9wOiAxcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYyZjJmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm90dG9tOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4udmlzdWFsaXplLWJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogLjdyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbjogMnB4O1xuICBwYWRkaW5nOiAycHg7XG59XG5cbjo6bmctZGVlcCAuY2FudmFzIHtcbiAgZm9udC1mYW1pbHk6ICdDb3VyaWVyIE5ldycsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbjo6bmctZGVlcCAuY2FudmFzIHRleHQge1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4iXX0= */"] });


/***/ }),

/***/ "8UQL":
/*!*********************************************!*\
  !*** ./src/app/core/simulation/scenario.ts ***!
  \*********************************************/
/*! exports provided: Scenario */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scenario", function() { return Scenario; });
class Scenario {
    constructor(name, path, description) {
        this.name = name;
        this.path = path;
        this.description = description;
        this.cover = `../../scenarios/${name}/cover.png`;
    }
}


/***/ }),

/***/ "8YQ4":
/*!**********************************************************!*\
  !*** ./src/scenarios/binary-search-tree/bst-scenario.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/core/simulation/scenario */ "8UQL");
/* harmony import */ var _scenes_bst_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/bst-scene */ "ge5I");
/* harmony import */ var _scenes_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/search */ "bND5");
/* harmony import */ var _scenes_imbalance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/imbalance */ "u4Gn");
/* harmony import */ var _scenes_insertion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/insertion */ "QQqd");
/* harmony import */ var _scenes_deletion_no_children__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/deletion-no-children */ "u1wl");
/* harmony import */ var _scenes_deletion_one_child__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/deletion-one-child */ "3REL");
/* harmony import */ var _scenes_deletion_two_children__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scenes/deletion-two-children */ "9uQM");








const bstScenario = new _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__["Scenario"]('Binary search tree', 'binary-search-tree', 'Insertion, deletion and searching in a binary search tree');
bstScenario.cover = 'scenarios/binary-search-tree/cover.png';
bstScenario.scenes = [
    _scenes_bst_scene__WEBPACK_IMPORTED_MODULE_1__["BstScene"],
    _scenes_search__WEBPACK_IMPORTED_MODULE_2__["Search"],
    _scenes_imbalance__WEBPACK_IMPORTED_MODULE_3__["Imbalance"],
    _scenes_insertion__WEBPACK_IMPORTED_MODULE_4__["Insertion"],
    _scenes_deletion_no_children__WEBPACK_IMPORTED_MODULE_5__["DeletionNoChildren"],
    _scenes_deletion_one_child__WEBPACK_IMPORTED_MODULE_6__["DeletionOneChild"],
    _scenes_deletion_two_children__WEBPACK_IMPORTED_MODULE_7__["DeletionTwoChildren"]
];
/* harmony default export */ __webpack_exports__["default"] = (bstScenario);


/***/ }),

/***/ "9TY2":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/providers/color-provider.ts ***!
  \*************************************************************/
/*! exports provided: ColorProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorProvider", function() { return ColorProvider; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class ColorProvider {
    constructor() {
        this.colorScheme = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([0, 0]).range(['#5d89a8', '#63ad82', '#a3699b']);
    }
    setColorScheme(values) {
        const currentMin = Math.min(...values);
        const currentMax = Math.max(...values);
        let [minimum, maximum] = this.colorScheme.domain();
        if (currentMin < minimum) {
            minimum = currentMin;
        }
        if (currentMax > maximum) {
            maximum = currentMax;
        }
        this.colorScheme = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([minimum, maximum]).range(['#5d89a8', '#63ad82', '#a3699b']);
    }
    getNodeColor(node) {
        if (node.isPlaceholder) {
            return '#E2E8CE';
        }
        else if (!node.isValueVisible) {
            return 'grey';
        }
        else {
            return d3__WEBPACK_IMPORTED_MODULE_0__["color"](this.colorScheme(node.value)).formatHex();
        }
    }
}


/***/ }),

/***/ "9uQM":
/*!**************************************************************************!*\
  !*** ./src/scenarios/binary-search-tree/scenes/deletion-two-children.ts ***!
  \**************************************************************************/
/*! exports provided: DeletionTwoChildren */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionTwoChildren", function() { return DeletionTwoChildren; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionTwoChildren {
    constructor() {
        this.id = 5;
        this.played = 'not_played';
        this.toRemove = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(8);
            nodes.sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
            const medianIndex = Math.floor(nodes.length / 2);
            const medianNode = nodes[medianIndex];
            nodes.splice(medianIndex, 1);
            simulation.nodeHandler.add(medianNode);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('bst', 0, 0);
            simulation.bstHandler.add(this.bst);
            yield this.bst.insert(medianNode, false);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
            this.toRemove = medianNode.value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.delete(this.toRemove);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion - Two children</h1>
  <p>
    It's quite complicated to delete an element from a binary search tree. There are
    three cases:
  </p>
  <ol>
    <li>
      <small>The node we're deleting</small> doesn't have any children (its children are empty leaves);
    </li>
    <li>
      <small>The node we're deleting</small> has only one child (the other one is an empty leaf);
    </li>
    <li>
      <b><small>The node we're deleting</small> has two children.</b>
    </li>
  </ol>
  <p>
    Now, let's see the third case and remove the node with value ${this.toRemove}, which is a root node.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    This case was the most complicated. Firstly, we had to find the right-most descendant in the left subtree
    of this node, that descendant is the closest node with a lower value than the node we intend to delete.
  </p>
  <p>
    Now, we swap the acquired descendant and <em>target</em> node. Since descendant was the rightmost node in a subtree,
    it is obvious that it had one child at most, so we employ the tactics used for either the first or the second case.
  </p>
    `;
    }
}


/***/ }),

/***/ "A0pT":
/*!*********************************************!*\
  !*** ./src/scenarios/sort/sort-scenario.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/core/simulation/scenario */ "8UQL");
/* harmony import */ var _scenes_start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/start */ "omR+");
/* harmony import */ var _scenes_bubble__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/bubble */ "xCmF");
/* harmony import */ var _scenes_insertion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/insertion */ "L20G");
/* harmony import */ var _scenes_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/selection */ "ED3O");
/* harmony import */ var _scenes_merge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/merge */ "lKEG");
/* harmony import */ var _scenes_quick__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/quick */ "5rxo");







const sortScenario = new _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__["Scenario"]('Sort', 'sort', 'Bubble, insertion, selection, merge and quick sort.');
sortScenario.cover = 'scenarios/sort/cover.png';
sortScenario.scenes = [
    _scenes_start__WEBPACK_IMPORTED_MODULE_1__["StartScene"],
    _scenes_bubble__WEBPACK_IMPORTED_MODULE_2__["Bubble"],
    _scenes_insertion__WEBPACK_IMPORTED_MODULE_3__["Insertion"],
    _scenes_selection__WEBPACK_IMPORTED_MODULE_4__["Selection"],
    _scenes_merge__WEBPACK_IMPORTED_MODULE_5__["Merge"],
    _scenes_quick__WEBPACK_IMPORTED_MODULE_6__["Quick"]
];
/* harmony default export */ __webpack_exports__["default"] = (sortScenario);


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Bwaa":
/*!*************************************************************!*\
  !*** ./src/scenarios/rb-tree/scenes/deletion-third-case.ts ***!
  \*************************************************************/
/*! exports provided: DeletionThirdCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionThirdCase", function() { return DeletionThirdCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionThirdCase {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toDelete = 35;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = this.createNodes(simulation, [30, 10, 40, 5, 15, 35, 45, 17]);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('rb', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
            const [deleted] = yield this.bst.delete(40, false);
            simulation.nodeHandler.remove(deleted);
        });
    }
    createNodes(simulation, values) {
        const nodes = [];
        for (const value of values) {
            nodes.push(simulation.objectFactory.create('node', 0, 0, value));
        }
        return nodes;
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.delete(this.toDelete);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion - third case</h1>

  <p>
    In the third case, sibling is rotated along with the deleted node's parent,
    so that sibling now becomes the parent to its previous parent. After that point,
    recoloring is performed so that old parent becomes red and sibling (new parent) becomes
    black.
  </p>
  <p>

  </p>
  <p>
    This case is demonstrated on the right-hand side by deletion of ${this.toDelete}
    from the tree.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <small>
    In this case, since 30 was root and thus black, checking wasn't propagated up the tree.
  </small>
    `;
    }
}


/***/ }),

/***/ "BytK":
/*!**********************************************************!*\
  !*** ./src/app/core/simulation/handlers/node-handler.ts ***!
  \**********************************************************/
/*! exports provided: NodeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeHandler", function() { return NodeHandler; });
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../basics/simulation-node */ "Q48m");

class NodeHandler {
    constructor(drawingHelper, dragHelper, mouseHelper, canvas, simulation, colorProvider) {
        this.maxId = 0;
        this.data = [];
        this.drawingHelper = drawingHelper;
        this.dragHelper = dragHelper;
        this.mouseHelper = mouseHelper;
        this.canvas = canvas;
        this.simulation = simulation;
        this.colorProvider = colorProvider;
    }
    add(obj) {
        let addingObj;
        if (obj instanceof _basics_simulation_node__WEBPACK_IMPORTED_MODULE_0__["SimulationNode"]) {
            addingObj = obj;
        }
        else if (Array.isArray(obj)) {
            addingObj = obj.map(el => el);
        }
        else {
            addingObj = undefined;
        }
        let values;
        if (Array.isArray(addingObj)) {
            values = addingObj.map(sn => sn.value);
            addingObj.forEach(d => {
                d.id = this.maxId++;
                this.data.push(d);
                // this.simulation.loop.nodes.push(d);
            });
        }
        else {
            if (!addingObj) {
                addingObj = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_0__["SimulationNode"](this.generateRandomValue(), -1, 0, 0);
            }
            values = [addingObj.value];
            addingObj.id = this.maxId++;
            this.data.push(addingObj);
            // this.simulation.loop.nodes.push(obj);
        }
        this.colorProvider.setColorScheme(values);
        return addingObj;
    }
    generateRandomValue(n = 100, fractionDigits = 1) {
        return parseFloat((Math.random() * n - n / 2).toFixed(fractionDigits));
    }
    draw() {
        this.data.sort((a, b) => b.nodeOrder - a.nodeOrder);
        this.canvas
            .selectAll('.node')
            .data(this.data, (d) => d.id)
            .join((enterElement) => this.enter(enterElement), (updateElement) => this.update(updateElement), (exitElement) => this.exit(exitElement));
    }
    enter(enterElement) {
        const nodeElement = this.drawingHelper.enter(enterElement);
        this.mouseHelper.addMouseInteraction(nodeElement.select('.node-circle'));
        this.dragHelper.addDragInteraction(nodeElement);
        return nodeElement;
    }
    update(updateElement) {
        this.drawingHelper.update(updateElement);
        return updateElement;
    }
    exit(exitElement) {
        this.drawingHelper.exit(exitElement);
        return exitElement;
    }
    remove(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(d => this.removeNode(d));
        }
        else {
            this.removeNode(obj);
        }
        this.draw();
    }
    removeNode(n) {
        const dataIndex = this.data.indexOf(n);
        // const forceIndex = this.simulation.loop.nodes.indexOf(n);
        if (dataIndex !== -1) {
            this.data.splice(dataIndex, 1);
        }
        // if (forceIndex !== -1) {
        //   // this.simulation.loop.nodes.splice(forceIndex, 1);
        // }
    }
    generateNodes(n, randomValue = 10, xPos = 0, yPos = 0) {
        const nodes = [];
        for (let i = 0; i < n; ++i) {
            let rand = this.generateRandomValue(randomValue);
            while (nodes.some(d => d.value === rand)) {
                rand = this.generateRandomValue(randomValue * randomValue);
            }
            // const pos = this.positionHelper.createRandomPointOnCircumference([0, 0], 1);
            const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_0__["SimulationNode"](rand, -1, xPos, yPos);
            nodes.push(node);
        }
        return nodes;
    }
    reset() {
        this.maxId = 0;
        this.data = [];
    }
}


/***/ }),

/***/ "COz+":
/*!*************************************************************!*\
  !*** ./src/app/view/content-view/content-view.component.ts ***!
  \*************************************************************/
/*! exports provided: ContentViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentViewComponent", function() { return ContentViewComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _core_services_scene_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/scene.service */ "1fSV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/scrollpanel */ "SSqW");
/* harmony import */ var primeng_skeleton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/skeleton */ "jeV5");









function ContentViewComponent_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Explanation ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "i", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx_r3.successContent, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
} }
const _c0 = function () { return { width: "100%", height: "84vh" }; };
function ContentViewComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p-scrollPanel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ContentViewComponent_div_0_Template_div_click_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r4.getRoute($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ContentViewComponent_div_0_div_3_Template, 4, 1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](4, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", ctx_r0.content, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.scene.played === "played");
} }
function ContentViewComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "p-skeleton", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "p-skeleton", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "p-skeleton", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "p-skeleton", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "p-skeleton", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "p-skeleton", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "p-skeleton", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "p-skeleton", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "p-skeleton", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "p-skeleton", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "p-skeleton", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "p-skeleton", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "p-skeleton", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "p-skeleton", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "p-skeleton", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "p-skeleton", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "p-skeleton", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "p-skeleton", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class ContentViewComponent {
    constructor(sceneService, router, sanitizer) {
        this.sceneService = sceneService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.content = '';
        this.successContent = '';
        this._isContentLoading = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](true);
        this.showLoadingSkeleton = true;
    }
    ngOnInit() {
        this.sceneService.set.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(100)).subscribe(val => {
            this.showLoadingSkeleton = true;
            this.getContent();
            this.showLoadingSkeleton = false;
        });
        this.sceneService.played.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(100)).subscribe(val => {
            if (val === 'played') {
                this.showLoadingSkeleton = true;
                this.getSuccessContent();
                this.showLoadingSkeleton = false;
            }
        });
    }
    getRoute(event) {
        // @ts-ignore
        const routerLink = event.target.getAttribute('href');
        if (!routerLink) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const url = this.router.serializeUrl(this.router.createUrlTree([routerLink]));
        window.open(url, '_blank');
    }
    getContent() {
        if (!this.scene) {
            this.content = '';
            return;
        }
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.scene.content());
    }
    getSuccessContent() {
        if (!this.scene) {
            this.successContent = '';
            return;
        }
        this.successContent = this.sanitizer.bypassSecurityTrustHtml(this.scene.successContent());
    }
    get scene() {
        return this.sceneService.scene.getValue();
    }
    get isContentLoading() {
        return this._isContentLoading.getValue();
    }
    set isContentLoading(val) {
        this._isContentLoading.next(val);
    }
}
ContentViewComponent.ɵfac = function ContentViewComponent_Factory(t) { return new (t || ContentViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_services_scene_service__WEBPACK_IMPORTED_MODULE_3__["SceneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"])); };
ContentViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ContentViewComponent, selectors: [["app-content-view"]], inputs: { isContentLoading: "isContentLoading" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["contentLoadingSkeleton", ""], [1, "content", 3, "innerHTML", "click"], ["class", "success-content", 4, "ngIf"], [1, "success-content"], [1, "p-ml-2", "pi", "pi-info-circle"], [3, "innerHTML"], [1, "content"], ["width", "70%", "height", "2.5rem", "styleClass", "p-mt-4 p-mb-4"], ["width", "85%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "90%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "82%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "91%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "14%", "height", "1rem", "styleClass", "p-mb-4"], ["width", "81%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "24%", "height", "1rem", "styleClass", "p-mb-4"], ["width", "94%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "87%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "19%", "height", "1rem", "styleClass", "p-mb-4"], ["width", "89%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "17%", "height", "1rem", "styleClass", "p-mb-4"], ["width", "86%", "height", "1rem", "styleClass", "p-mb-2"], ["width", "43%", "height", "1rem", "styleClass", "p-mb-4"]], template: function ContentViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ContentViewComponent_div_0_Template, 4, 5, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ContentViewComponent_ng_template_1_Template, 19, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.showLoadingSkeleton)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_7__["ScrollPanel"], primeng_skeleton__WEBPACK_IMPORTED_MODULE_8__["Skeleton"]], styles: [".content[_ngcontent-%COMP%] {\n  padding: .5rem 2rem;\n  color: white;\n}\n\n  .content a {\n  color: white;\n  font-weight: bold;\n  text-decoration: none;\n  background-color: #363636;\n  padding: .2rem;\n  border-radius: .3rem;\n}\n\n  .content a::after {\n  margin-left: .3rem;\n  margin-right: .1rem;\n  font-family: 'primeicons', serif;\n  content: '\\e93c';\n  font-size: .7em;\n}\n\n.success-content[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-left: 2rem;\n  margin-right: 2rem;\n  padding: 2rem;\n  background-color: #2e313b;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRlbnQtdmlldy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIscUJBQXFCO0VBQ3JCLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2Qsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFDaEMsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZCIsImZpbGUiOiJjb250ZW50LXZpZXcuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50IHtcbiAgcGFkZGluZzogLjVyZW0gMnJlbTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG46Om5nLWRlZXAgLmNvbnRlbnQgYSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM2MzYzNjtcbiAgcGFkZGluZzogLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IC4zcmVtO1xufVxuXG46Om5nLWRlZXAgLmNvbnRlbnQgYTo6YWZ0ZXIge1xuICBtYXJnaW4tbGVmdDogLjNyZW07XG4gIG1hcmdpbi1yaWdodDogLjFyZW07XG4gIGZvbnQtZmFtaWx5OiAncHJpbWVpY29ucycsIHNlcmlmO1xuICBjb250ZW50OiAnXFxlOTNjJztcbiAgZm9udC1zaXplOiAuN2VtO1xufVxuXG4uc3VjY2Vzcy1jb250ZW50IHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgbWFyZ2luLWxlZnQ6IDJyZW07XG4gIG1hcmdpbi1yaWdodDogMnJlbTtcbiAgcGFkZGluZzogMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJlMzEzYjtcbiAgY29sb3I6IHdoaXRlO1xufVxuIl19 */"] });


/***/ }),

/***/ "Cs7S":
/*!***********************************************************!*\
  !*** ./src/app/core/simulation/basics/simulation-link.ts ***!
  \***********************************************************/
/*! exports provided: SimulationLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationLink", function() { return SimulationLink; });
class SimulationLink {
    constructor(source, target, yDisplacement = 0) {
        this.strokeWidth = 10;
        this.z = -1;
        this.source = source;
        this.target = target;
        this.yDisplacement = yDisplacement;
    }
}


/***/ }),

/***/ "DFYs":
/*!*************************************************!*\
  !*** ./src/scenarios/stack-queue/scenes/pop.ts ***!
  \*************************************************/
/*! exports provided: Pop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pop", function() { return Pop; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class Pop {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.index = -1;
        this.elements = '';
        this.stackSize = -1;
        this.poppedValue = 23.11;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.stack = simulation.objectFactory.create('stack', 0, 0, 10);
            simulation.arrayHandler.add(this.stack);
            for (const node of nodes) {
                yield this.stack.push(node, false);
            }
            this.stack.descriptor = 'stack';
            this.poppedValue = this.stack.top.node.value;
            this.stackSize = !!this.stack ? this.stack.size : 10;
            this.elements = this.stack.data.slice(0, this.stackSize).map(c => c.node.value).join(', ');
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.stack.pop();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Stack - Pop operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's our stack with elements ${this.elements}.
  </p>
  <p>
    There are ${this.stackSize} elements in the stack.
    The highlighted element ${this.poppedValue} is the <em>top element</em> of the stack.
  </p>
  <p>
    The operation that will be performed now is the second crucial operation for stacks.
    It is called <b>pop</b>.
  </p>
  <p>
    Pop simply means the last element ${this.poppedValue} from the top
    will be deleted from the array, and an element left to it will become the new <em>top</em>.
  </p>
  <p>
    Let's see how elements are popped from this stack..
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    After successfully popping from the stack, we have received back the value ${this.poppedValue} from
    the stack.
  </p>
    `;
    }
}


/***/ }),

/***/ "Dgj+":
/*!************************************************************!*\
  !*** ./src/scenarios/arrays/scenes/insertion-beginning.ts ***!
  \************************************************************/
/*! exports provided: InsertionBeginning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertionBeginning", function() { return InsertionBeginning; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class InsertionBeginning {
    constructor() {
        this.id = 4;
        this.played = 'not_played';
        this.arrElement = -1;
        this.index = -1;
        this.arrSize = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            this.arrElement = 23.11;
            this.index = 0;
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.arrElement, -1, this.array.x, this.array.y - 200);
            simulation.nodeHandler.add(node);
            yield this.array.insertAt(node, this.index);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion at the beginning</h1>
  <p>
    Still that same array :D It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    Now, let's insert ${this.arrElement} at the the beginning (i.e. index [0]).
  </p>
  <p>
    Doesn't this already look similar to the previous scenario when we were moving elements to the right?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    Just like earlier, we head to move all the elements to the right of our new element's index.
  </p>
  <p>
    Since we wanted to insert ${this.arrElement} at the beginning, and that means at the index [0],
    we had to shift all existing elements to the right, starting from the index at which we wanted
    to insert ${this.arrElement}.
  </p>
  <p>
    Only after shifting all the elements to the right, were we sure
    that the array didn't have any elements at index [0],
    and we could simply insert ${this.arrElement} there.
  </p>
  `;
    }
}


/***/ }),

/***/ "ED3O":
/*!************************************************!*\
  !*** ./src/scenarios/sort/scenes/selection.ts ***!
  \************************************************/
/*! exports provided: Selection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Selection", function() { return Selection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_structures_array_selection_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/structures/array/selection-sort */ "PxU6");


class Selection {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.array.sorting = new _app_core_simulation_structures_array_selection_sort__WEBPACK_IMPORTED_MODULE_1__["SelectionSort"]();
            yield this.array.sort();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Selection sort</h1>
  <p>
    Selection sort is a simple sorting algorithm that maintains a sorted subarray,
    which is represented at the left side of the array. Iterating through the unsorted right subarray,
    the algorithm finds the maximum value there and simply puts it at the end of the
    left subarray.
  </p>
  <p>
    In this example, elements will be sorted in ascending order.
  </p>

  <p>
    Press play to sort the elements
  </p>
  `;
    }
    successContent() {
        return `

  <p>
    Among quadratic sorting algorithms (sorting algorithms with a simple average-case
    of <em>Θ(n<sup>2</sup>))</em>, selection sort almost always outperforms bubble sort.
    However, insertion sort is very similar.
  </p>
  <p>
    Finally, selection sort is greatly outperformed on larger arrays by divide-and-conquer
    algorithms such as mergesort or quicksort. However, insertion sort or selection sort
    are both typically faster for small arrays (i.e. fewer than 10–20 elements).
  </p>
    `;
    }
}


/***/ }),

/***/ "H8PZ":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/helpers/arrowhead-helper.ts ***!
  \*************************************************************/
/*! exports provided: ArrowheadHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowheadHelper", function() { return ArrowheadHelper; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class ArrowheadHelper {
    static addArrowhead(svg) {
        const path = d3__WEBPACK_IMPORTED_MODULE_0__["path"]();
        path.moveTo(0, 0);
        path.lineTo(10, 5);
        path.lineTo(0, 10);
        path.closePath();
        svg
            .append('defs')
            .append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '0 0 10 10')
            .attr('refX', 0)
            .attr('refY', 5)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', path.toString())
            .style('fill', 'white')
            .style('stroke', 'none');
    }
}


/***/ }),

/***/ "HzMd":
/*!**********************************************!*\
  !*** ./src/scenarios/rb-tree/rb-scenario.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/core/simulation/scenario */ "8UQL");
/* harmony import */ var _scenes_red_black__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/red-black */ "Uxho");
/* harmony import */ var _scenes_insertion_first_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/insertion-first-case */ "UJzJ");
/* harmony import */ var _scenes_insertion_second_case__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/insertion-second-case */ "d8E9");
/* harmony import */ var _scenes_insertion_third_case__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/insertion-third-case */ "gzon");
/* harmony import */ var _scenes_deletion_first_case__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/deletion-first-case */ "gxGK");
/* harmony import */ var _scenes_deletion_second_case__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/deletion-second-case */ "wWIz");
/* harmony import */ var _scenes_deletion_third_case__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scenes/deletion-third-case */ "Bwaa");








const rbScenario = new _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__["Scenario"]('Red-black tree', 'rb-avl', 'Insertion, deletion and searching in a Red-black tree ');
rbScenario.cover = 'scenarios/rb-tree/cover.png';
rbScenario.scenes = [
    _scenes_red_black__WEBPACK_IMPORTED_MODULE_1__["RedBlack"],
    _scenes_insertion_first_case__WEBPACK_IMPORTED_MODULE_2__["InsertionFirstCase"],
    _scenes_insertion_second_case__WEBPACK_IMPORTED_MODULE_3__["InsertionSecondCase"],
    _scenes_insertion_third_case__WEBPACK_IMPORTED_MODULE_4__["InsertionThirdCase"],
    _scenes_deletion_first_case__WEBPACK_IMPORTED_MODULE_5__["DeletionFirstCase"],
    _scenes_deletion_second_case__WEBPACK_IMPORTED_MODULE_6__["DeletionSecondCase"],
    _scenes_deletion_third_case__WEBPACK_IMPORTED_MODULE_7__["DeletionThirdCase"]
];
/* harmony default export */ __webpack_exports__["default"] = (rbScenario);


/***/ }),

/***/ "I0+v":
/*!***************************************************************!*\
  !*** ./src/app/view/scenario-grid/scenario-grid.component.ts ***!
  \***************************************************************/
/*! exports provided: ScenarioGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScenarioGridComponent", function() { return ScenarioGridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _core_services_scenario_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/scenario.service */ "Z/hl");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/card */ "QIUk");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/api */ "7zfz");
/* harmony import */ var primeng_ripple__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/ripple */ "Q4Mo");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/button */ "jIHw");








function ScenarioGridComponent_div_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 8);
} if (rf & 2) {
    const scenario_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("alt", scenario_r3.name + " cover")("src", scenario_r3.cover, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function ScenarioGridComponent_div_1_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScenarioGridComponent_div_1_ng_template_6_Template_button_click_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const scenario_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.visualize($event, scenario_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ScenarioGridComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ScenarioGridComponent_div_1_Template_div_click_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const scenario_r3 = ctx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.visualize($event, scenario_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p-card", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ScenarioGridComponent_div_1_ng_template_3_Template, 1, 2, "ng-template", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ScenarioGridComponent_div_1_ng_template_6_Template, 2, 0, "ng-template", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const scenario_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("header", scenario_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](scenario_r3.description);
} }
function ScenarioGridComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 11);
} }
function ScenarioGridComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ScenarioGridComponent {
    constructor(scenarioService, router) {
        this.scenarioService = scenarioService;
        this.router = router;
    }
    ngOnInit() {
    }
    visualize(event, scenario) {
        event.stopPropagation();
        this.scenarioService.currentScenario.next(scenario);
        this.router.navigate(['visualize', scenario.path, 0]);
    }
    playground() {
        event.stopPropagation();
        this.router.navigate(['playground']);
    }
    get scenarios() {
        return this.scenarioService.scenarios;
    }
}
ScenarioGridComponent.ɵfac = function ScenarioGridComponent_Factory(t) { return new (t || ScenarioGridComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_core_services_scenario_service__WEBPACK_IMPORTED_MODULE_1__["ScenarioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
ScenarioGridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ScenarioGridComponent, selectors: [["app-scenario-grid"]], decls: 8, vars: 1, consts: [[1, "p-grid", "scenario-grid", "p-justify-center"], ["class", "p-col-12 p-sm-6 p-md-4 p-xl-3", 4, "ngFor", "ngForOf"], [1, "p-col-12", "p-sm-6", "p-md-4", "p-xl-3"], ["header", "Soon...", 1, "soon-card"], ["pTemplate", "header"], ["pTemplate", "footer"], ["pRipple", "", 1, "clickable-card", 3, "click"], [3, "header"], [3, "alt", "src"], [1, "p-text-right"], ["label", "Visualize", "icon", "pi pi-eye", "pButton", "", 1, "p-button", "p-button-rounded", 3, "click"], ["alt", "Soon cover", "src", "scenarios/soon-cover.png"], ["label", "Visualize", "icon", "pi pi-eye", "disabled", "", "pButton", "", 1, "p-button", "p-button-rounded"]], template: function ScenarioGridComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ScenarioGridComponent_div_1_Template, 7, 2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p-card", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ScenarioGridComponent_ng_template_4_Template, 1, 0, "ng-template", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "More coming coon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ScenarioGridComponent_ng_template_7_Template, 2, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.scenarios);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], primeng_card__WEBPACK_IMPORTED_MODULE_4__["Card"], primeng_api__WEBPACK_IMPORTED_MODULE_5__["PrimeTemplate"], primeng_ripple__WEBPACK_IMPORTED_MODULE_6__["Ripple"], primeng_button__WEBPACK_IMPORTED_MODULE_7__["ButtonDirective"]], styles: [".scenario-grid[_ngcontent-%COMP%] {\n  margin: 2vh 10vw 0 10vw;\n}\n\n  .p-card {\n  -webkit-user-select: none;\n          user-select: none;\n}\n\n  .clickable-card {\n  cursor: pointer;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);\n}\n\n  .clickable-card::after {\n  content: \"\";\n  border-radius: 5px;\n  position: absolute;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);\n  opacity: 0;\n  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);\n}\n\n  .clickable-card:hover {\n  transform: scale(1.025, 1.025);\n}\n\n  .clickable-card:hover::after {\n  opacity: 1;\n}\n\n  .clickable-card .p-card-content {\n  height: 10vh;\n}\n\n  .soon-card .p-card-content {\n  height: 10vh;\n}\n\n  .p-card-content {\n  padding: 0 !important;\n}\n\n  .p-card-content p {\n  opacity: 0.8 !important;\n}\n\n  .p-card-footer {\n  opacity: 0.8 !important;\n}\n\n  .p-ripple.clickable-card .p-ink {\n  background: #2f2f2f;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5hcmlvLWdyaWQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUFpQjtVQUFqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysd0NBQXdDO0VBRXhDLHVEQUF1RDtBQUN6RDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUNBQXlDO0VBQ3pDLFVBQVU7RUFFVix1REFBdUQ7QUFDekQ7O0FBRUE7RUFFRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBR0E7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckIiLCJmaWxlIjoic2NlbmFyaW8tZ3JpZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNjZW5hcmlvLWdyaWQge1xuICBtYXJnaW46IDJ2aCAxMHZ3IDAgMTB2dztcbn1cblxuOjpuZy1kZWVwIC5wLWNhcmQge1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cblxuOjpuZy1kZWVwIC5jbGlja2FibGUtY2FyZCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC42cyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xuICB0cmFuc2l0aW9uOiBhbGwgMC42cyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xufVxuXG46Om5nLWRlZXAgLmNsaWNrYWJsZS1jYXJkOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAtMTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3gtc2hhZG93OiAwIDVweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgb3BhY2l0eTogMDtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC42cyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xuICB0cmFuc2l0aW9uOiBhbGwgMC42cyBjdWJpYy1iZXppZXIoMC4xNjUsIDAuODQsIDAuNDQsIDEpO1xufVxuXG46Om5nLWRlZXAgLmNsaWNrYWJsZS1jYXJkOmhvdmVyIHtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMDI1LCAxLjAyNSk7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wMjUsIDEuMDI1KTtcbn1cblxuOjpuZy1kZWVwIC5jbGlja2FibGUtY2FyZDpob3Zlcjo6YWZ0ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuXG46Om5nLWRlZXAgLmNsaWNrYWJsZS1jYXJkIC5wLWNhcmQtY29udGVudCB7XG4gIGhlaWdodDogMTB2aDtcbn1cblxuOjpuZy1kZWVwIC5zb29uLWNhcmQgLnAtY2FyZC1jb250ZW50IHtcbiAgaGVpZ2h0OiAxMHZoO1xufVxuXG46Om5nLWRlZXAgLnAtY2FyZC1jb250ZW50IHtcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xufVxuXG5cbjo6bmctZGVlcCAucC1jYXJkLWNvbnRlbnQgcCB7XG4gIG9wYWNpdHk6IDAuOCAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAgLnAtY2FyZC1mb290ZXIge1xuICBvcGFjaXR5OiAwLjggIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIC5wLXJpcHBsZS5jbGlja2FibGUtY2FyZCAucC1pbmsge1xuICBiYWNrZ3JvdW5kOiAjMmYyZjJmO1xufVxuIl19 */"] });


/***/ }),

/***/ "I3x1":
/*!***********************************************************!*\
  !*** ./src/scenarios/arrays/scenes/deletion-beginning.ts ***!
  \***********************************************************/
/*! exports provided: DeletionBeginning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionBeginning", function() { return DeletionBeginning; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionBeginning {
    constructor() {
        this.id = 7;
        this.played = 'not_played';
        this.arrElement = -1;
        this.index = -1;
        this.arrSize = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            this.index = 0;
            this.arrElement = this.array.data[this.index].node.value;
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.array.deleteAt(this.index);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion from a given index of an array</h1>
  <p>
    Glance at the array on the right-hand side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    What would happen if we wanted to delete an element from the beginning, i.e. index [${this.index}] of this array.
  </p>
  <p>
    You might think that every remaining element in the will be shifted to the left.
  </p>
  <small>
    HINT: That's correct.
  </small>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    After removing ${this.arrElement} from the array, that empty space from the beginning, index [${this.index}]
    had to be gone.
  </p>
  <p>
    That was managed by moving all the remaining elements to the left.
  </p>
  `;
    }
}


/***/ }),

/***/ "I9XJ":
/*!*********************************************************!*\
  !*** ./src/scenarios/arrays/scenes/insertion-middle.ts ***!
  \*********************************************************/
/*! exports provided: InsertionMiddle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertionMiddle", function() { return InsertionMiddle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class InsertionMiddle {
    constructor() {
        this.id = 4;
        this.played = 'not_played';
        this.arrElement = -1;
        this.index = -1;
        this.arrSize = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            this.arrElement = 23.11;
            this.index = Math.floor(this.array.size / 2);
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.arrElement, -1, this.array.x, this.array.y - 200);
            simulation.nodeHandler.add(node);
            yield this.array.insertAt(node, this.index);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion at a given index</h1>
  <p>
    There's still that same array from before. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    Now, let's insert ${this.arrElement} at the index [${this.index}].
  </p>
  <p>
    Are there any special steps in this new scenario that we need to perform prior to
    inserting this element at the index [${this.index}]?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    As you see, this was quite a complicated and timely process.
  </p>
  <p>
    Firstly, all of the elements starting from index [${this.index}]
    had to be moved one step to the right. And that was performed by
    moving those elements with the higher index first.
  </p>
  <p>
    Only after shifting all the elements to the right, were we sure
    that the array didn't have any elements at index [${this.index}],
    and we could simply insert ${this.arrElement} there.
  </p>
  `;
    }
}


/***/ }),

/***/ "K24U":
/*!*****************************************************!*\
  !*** ./src/scenarios/arrays/scenes/deletion-end.ts ***!
  \*****************************************************/
/*! exports provided: DeletionEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionEnd", function() { return DeletionEnd; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionEnd {
    constructor() {
        this.id = 5;
        this.played = 'not_played';
        this.arrElement = -1;
        this.index = -1;
        this.arrSize = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            this.index = this.array.size - 1;
            this.arrElement = this.array.data[this.array.size - 1].node.value;
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.array.deleteAt(this.index);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion from the end of an array</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    What would happen if we wanted to delete an element from the end, i.e. index [${this.index}] of this array.
  </p>
  <p>
    Are there any special steps that we need to perform prior to its deletion?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    Obviously, there weren't any necessary steps prior to this deletion.
    We simply just removed ${this.arrElement} from the index [${this.index}],
    so there are no more elements at that position.
  </p>
  `;
    }
}


/***/ }),

/***/ "KzYP":
/*!************************************************************************!*\
  !*** ./src/app/core/simulation/handlers/binary-search-tree-handler.ts ***!
  \************************************************************************/
/*! exports provided: BinarySearchTreeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BinarySearchTreeHandler", function() { return BinarySearchTreeHandler; });
class BinarySearchTreeHandler {
    constructor(simulation, dragHelper, drawingHelper, mouseHelper, bstCellDrawingHelper, bstCellDragHelper, bstCellMouseHelper, linkDrawingHelper, canvas) {
        this.data = [];
        this.maxId = 0;
        this.simulation = simulation;
        this.dragHelper = dragHelper;
        this.drawingHelper = drawingHelper;
        this.mouseHelper = mouseHelper;
        this.bstCellDrawingHelper = bstCellDrawingHelper;
        this.bstCellDragHelper = bstCellDragHelper;
        this.bstCellMouseHelper = bstCellMouseHelper;
        this.linkDrawingHelper = linkDrawingHelper;
        this.canvas = canvas;
    }
    add(tree) {
        tree.id = this.maxId++;
        tree.setRoot();
        this.data.push(tree);
    }
    draw() {
        const treeElements = this.canvas
            .selectAll('.bst')
            .data(this.data, (tree) => tree.id)
            .join(enterElement => this.enter(enterElement), updateElement => this.update(updateElement), exitElement => this.exit(exitElement));
        treeElements.lower();
    }
    enter(enterElement) {
        const treeElement = this.drawingHelper.enter(enterElement);
        this.mouseHelper.addMouseInteraction(treeElement);
        treeElement
            .selectAll('.bst-cell')
            .data((d) => d.getData(), (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.bstCellDrawingHelper.enter(enterCell);
            this.bstCellDragHelper.addDragInteraction(cellElement);
            this.bstCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        });
        treeElement
            .selectAll('.link')
            .data((d) => d.getLinks(), (link) => `${link.source.id}_${link.target.id}`)
            .join(enterLink => {
            const linkElement = this.linkDrawingHelper.enter(enterLink);
            linkElement.lower();
            return linkElement;
        });
        return treeElement;
    }
    update(updateElement) {
        this.drawingHelper.update(updateElement);
        updateElement
            .selectAll('.bst-cell')
            .data((d) => d.getData(), (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.bstCellDrawingHelper.enter(enterCell);
            this.bstCellDragHelper.addDragInteraction(cellElement);
            this.bstCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        }, updateCell => this.bstCellDrawingHelper.update(updateCell), exitCell => this.bstCellDrawingHelper.exit(exitCell));
        updateElement
            .selectAll('.link')
            .data((d) => d.getLinks(), (link) => `${link.target.id}_${link.target.id}`)
            .join(enterLink => {
            const linkElement = this.linkDrawingHelper.enter(enterLink);
            linkElement.lower();
            return linkElement;
        }, updateLink => this.linkDrawingHelper.update(updateLink).lower(), exitLink => this.linkDrawingHelper.exit(exitLink));
        return updateElement;
    }
    exit(exitElement) {
        return this.drawingHelper.exit(exitElement);
    }
    reset() {
        this.maxId = 0;
        this.data = [];
    }
}


/***/ }),

/***/ "L20G":
/*!************************************************!*\
  !*** ./src/scenarios/sort/scenes/insertion.ts ***!
  \************************************************/
/*! exports provided: Insertion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Insertion", function() { return Insertion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_structures_array_insertion_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/structures/array/insertion-sort */ "SULx");


class Insertion {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.array.sorting = new _app_core_simulation_structures_array_insertion_sort__WEBPACK_IMPORTED_MODULE_1__["InsertionSort"]();
            yield this.array.sort();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion sort</h1>
  <p>
    Insertion sort is a simple sorting algorithm that maintains a sorted sub-list,
    which is represented at the left side of the array. Iterating through the right subarray,
    each element is chosen and then but in the left sub-list, but only between one element
    which has a lower and the other which has a higher value.
  </p>
  <p>
   The array elements are compared with each other sequentially and then arranged simultaneously
   in some particular order. The analogy can be understood from the style we arrange a deck
   of cards. This sort works on the principle of inserting an element at a particular position,
   hence the name Insertion Sort.
   </p>
  <p>
    In this example, elements will be sorted in ascending order.
  </p>

  <p>
    Press play to sort the elements
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    The best case input is an array that is already sorted. In this case insertion sort
    has a linear running time (i.e., <em>O(n)</em>). During each iteration, the first remaining
    element of the input is only compared with the right-most element of the sorted
    subsection of the array.
  </p>
  <p>
     The simplest worst case input is an array sorted in reverse order. The set of all
     worst case inputs consists of all arrays where each element is the smallest or
     second-smallest of the elements before it. In these cases every iteration of the
     inner loop will scan and shift the entire sorted subsection of the array before
     inserting the next element. This gives insertion sort a quadratic running time
     (i.e., <em>O(n<sup>2</sup>)</em>).
  </p>
  <p>
     The average case is also quadratic, which makes insertion sort impractical for sorting
     large arrays. However, insertion sort is one of the fastest algorithms for sorting very
     small arrays, even faster than quicksort; indeed, good quicksort implementations use
     insertion sort for arrays smaller than a certain threshold, also when arising as
     subproblems; the exact threshold must be determined experimentally and depends on the machine,
     but is commonly around ten.
  </p>
    `;
    }
}


/***/ }),

/***/ "LHsi":
/*!*******************************************************!*\
  !*** ./src/scenarios/linked-list/scenes/pop-first.ts ***!
  \*******************************************************/
/*! exports provided: PopFirst */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopFirst", function() { return PopFirst; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class PopFirst {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
        this.toPop = -1;
        this.newFirst = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0);
            simulation.linkedListHandler.add(this.list);
            for (const node of nodes) {
                yield this.list.append(node, false);
            }
            this.toPop = nodes[0].value;
            this.newFirst = nodes[1].value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.list.popFirst();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linked list - pop first node</h1>
  <p>
    In order to remove the element which is placed at the beginning of a linked list,
    it is necessary to simply reverse steps from insertion at the beginning, that is:
  </p>
  <ul>
    <li>
      Get the node referenced by ${this.toPop}, which is ${this.newFirst};
    </li>
    <li>
      Set <em>head</em> to reference the node with value ${this.newFirst}.
    </li>
  </ul>
  <p>
    Now, let's visualize that.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.toPop} is now popped from the linked list and node with value
    ${this.newFirst} is referenced by <em>head</em>.
  </p>
    `;
    }
}


/***/ }),

/***/ "LNM3":
/*!***********************************************!*\
  !*** ./src/scenarios/heap/scenes/deletion.ts ***!
  \***********************************************/
/*! exports provided: Deletion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deletion", function() { return Deletion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class Deletion {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
        this.toDelete = -1;
        this.newRoot = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.heap = simulation.objectFactory.create('heap', 0, 0);
            simulation.heapHandler.add(this.heap);
            for (const node of nodes) {
                yield this.heap.insert(node, false);
            }
            if (nodes[3] !== this.heap.getRoot().node) {
                this.toDelete = nodes[3].value;
            }
            else {
                this.toDelete = nodes[2].value;
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.heap.delete(this.toDelete);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Heap - deletion</h1>
  <p>
    In order to remove an element with a given value, firstly the heap
    from the right-hand side has to be searched using breadth-first-search
    for that value.
  </p>
  <p>
    After finding the target node, it is swapped with the last leaf
    of the heap, just like it was the case with extracting the minimum
    value.
  </p>
  <p>
    Then, the last node is removed from the heap, and the remaining
    swapped node is propagated down the heap in order to restore
    heap properties.
  </p>
  <p>
    Let's see how all this works with the value ${this.toDelete}.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.toDelete} is now removed from the heap, and
    the its order is restored.
  </p>
    `;
    }
}


/***/ }),

/***/ "LVtG":
/*!******************************************************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree.ts ***!
  \******************************************************************************************************/
/*! exports provided: BinarySearchTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BinarySearchTree", function() { return BinarySearchTree; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _bst_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bst-cell */ "r+2I");
/* harmony import */ var _binary_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../binary-tree */ "MDJh");



class BinarySearchTree extends _binary_tree__WEBPACK_IMPORTED_MODULE_2__["BinaryTree"] {
    constructor(id, x, y) {
        super(id, x, y);
        this.children = {};
        this.parents = {};
    }
    addCell(cell, parent, left = true) {
        this.data.push(cell);
        // this.setLeftChild(parent, cell)
        if (left) {
            this.setLeftChild(parent, cell);
        }
        else {
            this.setRightChild(parent, cell);
        }
    }
    /**
     * Removes cell from the tree and detaches it from all other cells.
     * @param cell
     */
    deleteCell(cell) {
        this.linkHelper.detachCompletely(cell);
        this.data = this.data.filter(c => c !== cell);
        this.detachChildren(cell);
        this.detachParent(cell);
    }
    addChildCells(cell) {
        const leftChild = new _bst_cell__WEBPACK_IMPORTED_MODULE_1__["BstCell"](this, this.maxId++, cell.x, cell.y);
        const rightChild = new _bst_cell__WEBPACK_IMPORTED_MODULE_1__["BstCell"](this, this.maxId++, cell.x, cell.y);
        this.addCell(leftChild, cell, false);
        this.addCell(rightChild, cell, true);
        this.linkHelper.addLink(cell, leftChild);
        this.linkHelper.addLink(cell, rightChild);
    }
    add(d, bstCell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            bstCell.setNode(d);
            this.addChildCells(bstCell);
            this.alignForces();
            const isValid = this.checkEntry(bstCell);
            if (!isValid) {
                this.isValid = false;
                bstCell.isValid = false;
            }
        });
    }
    find(value, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.data.length === 0) {
                return null;
            }
            let checkingCell = this.getRoot();
            while (checkingCell) {
                if (!checkingCell.node) {
                    return null;
                }
                const node = checkingCell.node;
                node.drawArrow = true;
                if (animate) {
                    yield new Promise(r => setTimeout(r, 600));
                }
                node.drawArrow = false;
                if (node.value === value) {
                    node.highlighted = true;
                    if (animate) {
                        yield new Promise(r => setTimeout(r, 600));
                    }
                    node.highlighted = false;
                    return checkingCell;
                }
                else if (value < node.value) {
                    checkingCell = this.getLeftChild(checkingCell);
                }
                else {
                    checkingCell = this.getRightChild(checkingCell);
                }
            }
        });
    }
    /**
     * Finds and deletes a node with the passed value.
     * @param value - Value used to find a node and then delete it.
     * @param animate
     * @return nodeCellPromise - A promise of an array consisting of simulation node,
     * a cell that was the first one affected by the occurred deletion, and a cell from
     * which the node was deleted.
     * The cell is null if the deleted node didn't have a parent, i.e. it was the root.
     */
    delete(value, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const found = yield this.find(value, animate);
            if (!found) {
                return null;
            }
            const leftChild = this.getLeftChild(found);
            const rightChild = this.getRightChild(found);
            let ret;
            if (!leftChild.node && !rightChild.node) {
                ret = yield this.deleteLeaf(found, leftChild, rightChild);
            }
            else if (!leftChild.node || !rightChild.node) {
                ret = yield this.deleteOnlyChild(found, leftChild, rightChild);
            }
            else {
                ret = yield this.deleteTwoChildren(found, leftChild);
            }
            ret[0].setTarget(this.x, this.y - 200);
            return ret;
        });
    }
    /**
     * Deletes a node which doesn't have any children besides empty cells (which are mandatory).
     * @param target - The cell being deleted.
     * @param leftChild - Left child of the cell being deleted.
     * @param rightChild - Right child of the cell being deleted.
     * @param animate - Whether the process should be animated.
     * @returns promise - A promise of the node which was deleted,
     * and the exact cell from which the node was deleted (twice for uniformity).
     */
    deleteLeaf(target, leftChild, rightChild, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.deleteCell(leftChild);
            this.deleteCell(rightChild);
            this.alignForces();
            return [target.removeNode(), target, target];
        });
    }
    /**
     * Deletes a node which which has one child cell that contains a node and one that does not.
     * @param target - The cell being deleted.
     * @param leftChild - Left child of the cell being deleted.
     * @param rightChild - Right child of the cell being deleted.
     * @param animate - Whether the process should be animated.
     * @returns promise - A promise of the node which was deleted and the cell which replaces 'target'
     * (i.e. this cell was target's child and now is a child of the same cell the target was).
     */
    deleteOnlyChild(target, leftChild, rightChild, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const [parent, targetIndex] = this.getParent(target);
            const takenCell = !!leftChild.node ? leftChild : rightChild;
            const freeCell = !leftChild.node ? leftChild : rightChild;
            this.deleteCell(freeCell);
            this.deleteCell(target);
            if (targetIndex === 0) {
                this.setLeftChild(parent, takenCell);
            }
            else {
                this.setRightChild(parent, takenCell);
            }
            const node = target.removeNode();
            if (animate) {
                if (!!node) {
                    node.setTarget(this.x, this.y - 100);
                }
                yield new Promise(r => setTimeout(r, 600));
            }
            if (parent) {
                this.linkHelper.addLink(parent, takenCell);
            }
            else {
                this.setLeftChild(null, takenCell);
                takenCell.setDefaultDescriptor(target.defaultDescriptor);
                takenCell.isRoot = true;
            }
            this.alignForces();
            return [node, takenCell, target];
        });
    }
    /**
     * Deletes the node whose both children contain nodes.
     * @param target - The cell being deleted.
     * @param leftChild - Left child of the cell being deleted.
     * @param animate - Whether the process should be animated.
     * @return nodeCellPromise - A promise of an array consisting of simulation node,
     * the cell that was the first one affected by the occurred deletion, and the cell
     * from which the node was deleted.
     *
     * The affected cell is null if the deleted node didn't have a parent, i.e. it was the root.
     */
    deleteTwoChildren(target, leftChild, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const substituteCell = yield this.findMax(leftChild);
            const substituteNode = substituteCell.removeNode();
            const node = target.removeNode();
            if (animate) {
                node.setTarget(this.x, this.y - 100);
                substituteNode.setTarget(target.x, target.y);
                yield new Promise(r => setTimeout(r, 600));
            }
            target.setNode(substituteNode);
            const substituteLeft = this.getLeftChild(substituteCell);
            const substituteRight = this.getRightChild(substituteCell);
            let deleted;
            if (!substituteLeft.node && !substituteRight.node) {
                deleted = (yield this.deleteLeaf(substituteCell, substituteLeft, substituteRight, animate));
            }
            else if (!substituteLeft.node || !substituteRight.node) {
                deleted = (yield this.deleteOnlyChild(substituteCell, substituteLeft, substituteRight, animate));
            }
            return [node, deleted[1], deleted[2]];
        });
    }
    findMax(sourceSubtreeRoot, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let rightCell = sourceSubtreeRoot;
            if (animate) {
                rightCell.highlight('#5cff00');
                yield new Promise(r => setTimeout(r, 600));
                rightCell.resetColor();
            }
            let potentialRightCell = this.getRightChild(rightCell);
            while (!!potentialRightCell.node) {
                rightCell = potentialRightCell;
                if (animate) {
                    rightCell.highlight('#5cff00');
                    yield new Promise(r => setTimeout(r, 600));
                    rightCell.resetColor();
                }
                potentialRightCell = this.getRightChild(rightCell);
            }
            return rightCell;
        });
    }
    insert(node, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let checkingCell = this.getRoot();
            while (checkingCell) {
                let side = 0;
                if (!checkingCell.node) {
                    if (animate) {
                        node.setTarget(checkingCell.x + side, checkingCell.y - 100);
                        yield new Promise(r => setTimeout(r, 600));
                    }
                    yield this.add(node, checkingCell, animate);
                    return;
                }
                const checkingNode = checkingCell.node;
                checkingNode.drawArrow = true;
                if (checkingNode.value === node.value) {
                    checkingNode.drawArrow = false;
                    return;
                }
                else if (checkingNode.value > node.value) {
                    side = -100;
                    checkingCell = this.getLeftChild(checkingCell);
                    if (animate) {
                        node.setTarget(checkingNode.x + side, checkingNode.y);
                        yield new Promise(r => setTimeout(r, 600));
                    }
                }
                else {
                    side = 100;
                    checkingCell = this.getRightChild(checkingCell);
                    if (animate) {
                        node.setTarget(checkingNode.x + side, checkingNode.y);
                        yield new Promise(r => setTimeout(r, 600));
                    }
                }
                checkingNode.drawArrow = false;
            }
        });
    }
    checkEntry(cell) {
        let [parent, childIndex] = this.getParent(cell);
        while (!!parent) {
            const isLeftChild = childIndex === 0;
            if (isLeftChild) {
                if (cell.node.value > parent.node.value) {
                    return false;
                }
            }
            else {
                if (cell.node.value < parent.node.value) {
                    return false;
                }
            }
            [parent, childIndex] = this.getParent(parent);
        }
        return true;
    }
    /**
     * @param cell - Parent
     * @returns - The left child of the provided *cell*.
     * If *cell* isn't provided, returns undefined.
     * @protected
     */
    getLeftChild(cell) {
        if (!cell) {
            return undefined;
        }
        const children = this.children[cell.id];
        if (!children) {
            return undefined;
        }
        return children[0];
    }
    /**
     * Sets the child cell as the left child of the parent cell.
     * @param parent
     * @param child
     * @protected
     */
    setLeftChild(parent, child) {
        if (!child) {
            return;
        }
        this.detachParent(child);
        const parentId = !!parent ? parent.id : -1;
        if (!this.children[parentId]) {
            this.children[parentId] = [undefined, undefined];
        }
        this.children[parentId][0] = child;
        this.parents[child.id] = [parent, 0];
    }
    /**
     * @param cell - Parent
     * @returns - The right child of the provided *cell*.
     * If *cell* isn't provided, returns undefined.
     * @protected
     */
    getRightChild(cell) {
        if (!cell) {
            return undefined;
        }
        const children = this.children[cell.id];
        if (!children) {
            return undefined;
        }
        return children[1];
    }
    /**
     * Sets the child cell as the right child of the parent cell.
     * @param parent
     * @param child
     * @protected
     */
    setRightChild(parent, child) {
        if (!child) {
            return;
        }
        this.detachParent(child);
        const parentId = !!parent ? parent.id : -1;
        if (!this.children[parentId]) {
            this.children[parentId] = [undefined, undefined];
        }
        this.children[parentId][1] = child;
        this.parents[child.id] = [parent, 1];
    }
    /**
     *
     * @param cell - Child cell.
     * @returns - The list which contains the parent of the passed cell,
     * and an index denoting whether the cell is left (0) or the right(1)
     * child of the parent.
     * If there's no cell, a list with undefined elements is returned.
     * @protected
     */
    getParent(cell) {
        if (!cell) {
            return [undefined, undefined];
        }
        console.log(cell.id);
        console.log(this.parents);
        return this.parents[cell.id];
    }
    /**
     * Detaches cell from its children.
     * @param cell - Parent which will be detached from its children.
     * @protected
     */
    detachChildren(cell) {
        if (!cell || !this.children[cell.id]) {
            return;
        }
        for (const cellsChild of this.children[cell.id]) {
            if (!cellsChild) {
                continue;
            }
            if (this.parents[cellsChild.id][0] === cell) {
                delete this.parents[cellsChild.id];
            }
        }
        delete this.children[cell.id];
    }
    /**
     * Detaches cell from its parent.
     * @param cell - Child which will be detached from its parent.
     * @protected
     */
    detachParent(cell) {
        if (!cell) {
            return;
        }
        if (!this.parents[cell.id]) {
            return;
        }
        const [parent, childIndex] = this.parents[cell.id];
        const parentId = !!parent ? parent.id : -1;
        if (this.children[parentId][childIndex] === cell) {
            this.children[parentId][childIndex] = undefined;
        }
        delete this.parents[cell.id];
    }
    /**
     * @returns - The root of the tree.
     */
    getRoot() {
        return this.children[-1][0];
    }
}


/***/ }),

/***/ "MDJh":
/*!****************************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/binary-tree/binary-tree.ts ***!
  \****************************************************************************/
/*! exports provided: BinaryTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BinaryTree", function() { return BinaryTree; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _bst_cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bst-cell */ "r+2I");
/* harmony import */ var _simulation_graph__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../simulation-graph */ "ftLo");




class BinaryTree extends _simulation_graph__WEBPACK_IMPORTED_MODULE_3__["SimulationGraph"] {
    constructor(id, x, y) {
        super(id, x, y);
    }
    /**
     * Initializes the root.
     */
    setRoot() {
        const root = new _bst_cell__WEBPACK_IMPORTED_MODULE_2__["BstCell"](this, this.maxId++, this.x, this.y);
        root.isRoot = true;
        root.setDefaultDescriptor(`tree_${this.id}`);
        this.addCell(root, null, true);
    }
    /**
     * Sets horizontal and vertical position of the tree.
     * @param x - Horizontal position.
     * @param y - Vertical position.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.alignForces();
    }
    /**
     * Positions the tree according to the d3 library using
     * d3.hierarchy and d3.tree(), which provide correct positioning
     * for all the nodes in the tree.
     */
    alignForces() {
        this.treeHierarchy = d3__WEBPACK_IMPORTED_MODULE_1__["hierarchy"](this.getRoot(), (d) => {
            const children = [];
            const leftChild = this.getLeftChild(d);
            const rightChild = this.getRightChild(d);
            if (!!leftChild) {
                children.push(leftChild);
            }
            if (!!rightChild) {
                children.push(rightChild);
            }
            return children;
        });
        const treeMap = d3__WEBPACK_IMPORTED_MODULE_1__["tree"]()
            .nodeSize([180, 180]);
        treeMap(this.treeHierarchy)
            .descendants().forEach((d) => {
            d.x += this.x;
            d.y += this.y;
            d.data.graphMoved(d.x, d.y);
        });
    }
    /**
     * Moves the whole tree if the cell is root, otherwise
     * returns the cell to its previous position
     * @param cell - Moved cell.
     * @param xPos - Horizontal position of the cell.
     * @param yPos - Vertical position of the cell.
     */
    moveCell(cell, xPos, yPos) {
        if (cell.isRoot) {
            this.setPosition(xPos, yPos);
            return;
        }
        else {
            cell.setTarget(cell.graphX, cell.graphY);
            return;
        }
    }
    /**
     * Removes the invalid node from the tree and deletes its children.
     */
    fix() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const invalidCell = this.data.find((c) => !!c && !c.isValid);
            invalidCell.removeNode();
            const leftChild = this.getLeftChild(invalidCell);
            const rightChild = this.getRightChild(invalidCell);
            this.deleteCell(leftChild);
            this.deleteCell(rightChild);
            this.isValid = true;
            invalidCell.isValid = true;
            this.alignForces();
            return;
        });
    }
}


/***/ }),

/***/ "N/sd":
/*!***********************************************************!*\
  !*** ./src/scenarios/linked-list/linked-list-scenario.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/core/simulation/scenario */ "8UQL");
/* harmony import */ var _scenes_linked_list_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/linked-list-scene */ "6Ccv");
/* harmony import */ var _scenes_prepend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/prepend */ "T9kh");
/* harmony import */ var _scenes_append__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/append */ "odae");
/* harmony import */ var _scenes_insertion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/insertion */ "iIX3");
/* harmony import */ var _scenes_pop_first__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/pop-first */ "LHsi");
/* harmony import */ var _scenes_pop_last__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/pop-last */ "WW+/");
/* harmony import */ var _scenes_deletion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scenes/deletion */ "YO5I");








const linkedListScenario = new _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__["Scenario"]('Linked list', 'linked-list', 'Prepending, appending, insertion and removing the elements');
linkedListScenario.cover = 'scenarios/linked-list/cover.png';
linkedListScenario.scenes = [
    _scenes_linked_list_scene__WEBPACK_IMPORTED_MODULE_1__["LinkedListScene"],
    _scenes_prepend__WEBPACK_IMPORTED_MODULE_2__["Prepend"],
    _scenes_append__WEBPACK_IMPORTED_MODULE_3__["Append"],
    _scenes_insertion__WEBPACK_IMPORTED_MODULE_4__["Insertion"],
    _scenes_pop_first__WEBPACK_IMPORTED_MODULE_5__["PopFirst"],
    _scenes_pop_last__WEBPACK_IMPORTED_MODULE_6__["PopLast"],
    _scenes_deletion__WEBPACK_IMPORTED_MODULE_7__["Deletion"]
];
/* harmony default export */ __webpack_exports__["default"] = (linkedListScenario);


/***/ }),

/***/ "Nv6G":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/heap-mouse.ts ***!
  \*************************************************************/
/*! exports provided: HeapMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeapMouse", function() { return HeapMouse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-context-menu */ "Ttfg");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(d3_context_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basics/simulation-node */ "Q48m");



class HeapMouse {
    constructor(simulation) {
        this.simulation = simulation;
    }
    contextMenu(d, i, trees) {
        const menu = [
            {
                title: 'Change name',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    elm.getRoot().setDefaultDescriptor(yield this.simulation.prompt('New name'));
                })
            },
            {
                // divider
                divider: true
            },
            {
                title: 'Get minimum',
                disabled: !d.isValid,
                action: (heap) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    // await heap.findMin();
                })
            },
            {
                title: 'Insert',
                disabled: !d.isValid,
                action: (heap) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = parseFloat(yield this.simulation.prompt('Which value to insert'));
                    if (isNaN(newValue)) {
                        alert('Value invalid');
                        return;
                    }
                    const lastCell = heap.getEmptyCell();
                    const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__["SimulationNode"](newValue, -1, lastCell.x, lastCell.y - 150);
                    this.simulation.nodeHandler.add(node);
                    yield heap.insert(node);
                })
            },
            {
                title: 'Delete',
                disabled: !d.isValid,
                action: (heap) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const deleteValue = parseFloat(yield this.simulation.prompt('Which value to delete'));
                    if (isNaN(deleteValue)) {
                        alert('Value invalid');
                        return;
                    }
                    yield heap.delete(deleteValue);
                })
            },
            {
                title: 'Delete min',
                disabled: !d.isValid,
                action: (heap) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield heap.deleteMin();
                })
            },
            {
                title: 'Info log',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    console.log(elm);
                })
            }
        ];
        // if (!d.isValid) {
        //   menu.push(
        //     {
        //       divider: true
        //     },
        //     {
        //       title: 'Fix tree',
        //       action: async (heap: Heap) => {
        //         await heap.fix();
        //       }
        //     }
        //   );
        // }
        d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default()(menu)(d, i);
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element
            // .on('mouseover', (d: Heap, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
            // .on('mouseout', (d: Heap, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
            .on('contextmenu', ((d, i, trees) => this.contextMenu(d, i, trees)));
        return element;
    }
}


/***/ }),

/***/ "Nx3Y":
/*!**********************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/simulation-stack.ts ***!
  \**********************************************************************/
/*! exports provided: SimulationStack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationStack", function() { return SimulationStack; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _simulation_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./simulation-array */ "oN2I");


class SimulationStack extends _simulation_array__WEBPACK_IMPORTED_MODULE_1__["SimulationArray"] {
    constructor(id, x, y, descriptor) {
        super(id, x, y, descriptor);
    }
    push(node, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.capacity === this.size) {
                throw new Error('Stack overflow');
            }
            yield this.insertAt(node, this.size, animate);
            yield this.setTop(animate);
        });
    }
    pop(animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.size === 0) {
                throw new Error('No elements in the stack');
            }
            yield this.deleteAt(this.size - 1);
            yield this.setTop(animate);
        });
    }
    setTop(animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!!this.top) {
                this.top.resetColor();
            }
            if (this.size - 1 < 0) {
                return;
            }
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            this.top = this.data[this.size - 1];
            this.top.highlight('#fdd828');
        });
    }
}


/***/ }),

/***/ "OIvA":
/*!******************************************************!*\
  !*** ./src/scenarios/arrays/scenes/sorted-search.ts ***!
  \******************************************************/
/*! exports provided: SortedSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortedSearch", function() { return SortedSearch; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class SortedSearch {
    constructor() {
        this.id = 1;
        this.played = 'not_played';
        this.arrElement = -1;
        this.arrSize = -1;
        this.movedElements = '';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            nodes.sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            if (!this.array || !this.array.data[6].node) {
                this.arrElement = -1;
            }
            else {
                this.arrElement = this.array.data[6].node.value;
            }
            this.array.sorted = true;
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.array.binarySearch(this.arrElement);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Binary search</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} sorted elements,
    going from the lowest to the highest value.
  </p>
  <p>
    What do you think would be the best method to find a node with value ${this.arrElement}?
  </p>
  <p>
    Is there any advantage that sorted arrays have over unsorted ones?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    This is called binary search. Binary Search is a searching algorithm for finding an element's position in a sorted array.
  </p>
  <p>
    Knowing where the middle of the array is, we are checking from that element.
    If our desired element happens to be lower than the middle element, we know that we only
    have to check the left portion of the array.
  </p>
  <p>
    Binary search begins by comparing an element in the middle of the array with the target value.
    If the target value matches the element, its position in the array is returned.
    If the target value is less than the element, the search continues in the lower half of the array.
    If the target value is greater than the element, the search continues in the upper half of the array.
    By doing this, the algorithm eliminates the half in which the target value cannot lie in each iteration.
  </p>
  <small>
    Remember: Binary search can be implemented only on a sorted list of items.
    If the elements are not sorted already, we need to sort them first.
  </small>
`;
    }
}


/***/ }),

/***/ "PxU6":
/*!********************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/selection-sort.ts ***!
  \********************************************************************/
/*! exports provided: SelectionSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionSort", function() { return SelectionSort; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class SelectionSort {
    sort(arr) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (let i = 0; i < arr.size; ++i) {
                let minIndex = i;
                arr.data[minIndex].highlight('#08ff00');
                yield new Promise(r => setTimeout(r, 600));
                for (let j = i + 1; j < arr.size; ++j) {
                    arr.data[j].highlight('#fdd828');
                    yield new Promise(r => setTimeout(r, 600));
                    arr.data[j].resetColor();
                    if (arr.data[j].node.value < arr.data[minIndex].node.value) {
                        arr.data[minIndex].resetColor();
                        minIndex = j;
                        arr.data[minIndex].highlight('#08ff00');
                        yield new Promise(r => setTimeout(r, 600));
                    }
                }
                arr.data[minIndex].resetColor();
                if (i !== minIndex) {
                    yield arr.swapNodes(arr.data[i], arr.data[minIndex]);
                }
                arr.data[i].highlight('#98dc73');
            }
        });
    }
}


/***/ }),

/***/ "Q1mz":
/*!************************************************************!*\
  !*** ./src/scenarios/arrays/scenes/unsuccessful-search.ts ***!
  \************************************************************/
/*! exports provided: UnsuccessfulSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsuccessfulSearch", function() { return UnsuccessfulSearch; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class UnsuccessfulSearch {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.arrElement = -1;
        this.arrSize = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            this.arrElement = 23.11;
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.array.linearSearch(this.arrElement);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linear search - unsuccessful</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize}
    elements in an arbitrary order.
  </p>
  <p>
    What is, in your opinion, the best way to deterine that ${this.arrElement} is not present in the array?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    As you see, the algorithm had to check every single element of the array, from
    [0] all the way up to [${this.array.size - 1}], and only after finding out that
    none of them was equal to ${this.arrElement}, could it be sure that ${this.arrElement}
    was not in the array.
  </p>
  `;
    }
}


/***/ }),

/***/ "Q48m":
/*!***********************************************************!*\
  !*** ./src/app/core/simulation/basics/simulation-node.ts ***!
  \***********************************************************/
/*! exports provided: SimulationNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationNode", function() { return SimulationNode; });
class SimulationNode {
    constructor(value, id, x, y) {
        this.radius = 40;
        this.isValueVisible = true;
        this.isInteractable = true;
        this.drawArrow = false;
        this.highlighted = false;
        this.nodeOrder = 1;
        this.noCollision = false;
        this.pointerEvents = true;
        this.isPlaceholder = false;
        this.value = value;
        this.id = id;
        this.cx = x;
        this.cy = y;
        this.x = x;
        this.y = y;
    }
    setTarget(x, y) {
        this.cx = x;
        this.cy = y;
    }
    move(x, y) {
        if (!this.noCollision) {
            this.cx = x;
            this.cy = y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }
}


/***/ }),

/***/ "QQqd":
/*!**************************************************************!*\
  !*** ./src/scenarios/binary-search-tree/scenes/insertion.ts ***!
  \**************************************************************/
/*! exports provided: Insertion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Insertion", function() { return Insertion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class Insertion {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toAdd = 2.31;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(8);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('bst', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.toAdd, -1, this.bst.x, this.bst.y - 200);
            simulation.nodeHandler.add(node);
            yield this.bst.insert(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion</h1>
  <p>
    Inserting a value in the correct position is similar to searching
    because we try to maintain the rule that a node's left subtree is lower
    than the node and the right subtree is higher than the node.
  </p>
  <p>
    Using that rule, after reaching a leaf, we place our new node on that position.
  </p>
  <p>
    So, let's add ${this.toAdd} to the tree.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    A node with value ${this.toAdd} was successfully placed on a leaf's position, and
    all the properties of the binary search tree still apply.
  </p>
    `;
    }
}


/***/ }),

/***/ "R1Ht":
/*!*************************************************!*\
  !*** ./src/scenarios/heap/scenes/tree-scene.ts ***!
  \*************************************************/
/*! exports provided: TreeScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeScene", function() { return TreeScene; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class TreeScene {
    constructor() {
        this.id = 0;
        this.played = 'unplayable';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            const heap = simulation.objectFactory.create('heap', 0, 0);
            simulation.heapHandler.add(heap);
            for (const node of nodes) {
                yield heap.insert(node, false);
            }
        });
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Tree - Binary tree</h1>
  <p>
    A <em>tree</em> is a data structure consisting of nodes which are placed in a
    hierarchical order.
  </p>
  <p>
    In general, each node individually has a parent node and an arbitrary number of children nodes.
    That means that every single node of a tree contains its own set of children nodes. Finding a
    parent of some <b>target</b> node in the tree is only a matter of knowing which node contains
    <b>target</b> node as an element in its children set.
  </p>
  <p>
    The first node of a tree, the topmost one which doesn't have any parents is called the
    <em>root</em> node.
  </p>
  <p>
    Nodes which do not have any children are called <em>leaf</em> nodes, and they are
    last nodes of every branch in a tree.
  </p>
  <p>
    Looking at a particular <b>target</b> node in a tree and all of its descendants, that portion can
    be considered as a <em>subtree</em>.
  </p>
  <p>
    <em>Height</em> of a <b>target</b> node is the longest distance to a leaf in its subtree. That is, the highest number of nodes
    which have to be passed on a path from the <b>target</b> node to any leaf which is a descendant of that <b>target</b> node.
  </p>
  <p>
    Type of a tree covered here is called a <em>binary tree</em>. It's a tree where each node has two children nodes
    at most
  </p>

  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "RPKT":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/array-menu.ts ***!
  \*************************************************************/
/*! exports provided: arrayMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayMenu", function() { return arrayMenu; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../basics/simulation-node */ "Q48m");
/* harmony import */ var _structures_array_insertion_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../structures/array/insertion-sort */ "SULx");
/* harmony import */ var _structures_array_selection_sort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../structures/array/selection-sort */ "PxU6");
/* harmony import */ var _structures_array_bubble_sort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../structures/array/bubble-sort */ "1pPF");
/* harmony import */ var _structures_array_merge_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../structures/array/merge-sort */ "m05m");
/* harmony import */ var _structures_array_quick_sort__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../structures/array/quick-sort */ "5WNV");







const arrayMenu = (simulation) => [
    {
        title: 'Set size',
        action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            const newValue = yield simulation.prompt('New size');
            let parsed = parseFloat(newValue);
            if (isNaN(parsed)) {
                parsed = 10;
            }
            elm.setCapacity(parsed);
        })
    },
    {
        title: 'Change name',
        action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            elm.descriptor = yield simulation.prompt('New name');
        })
    },
    {
        // divider
        divider: true
    },
    {
        title: 'Find',
        action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            const newValue = yield simulation.prompt('Which value to find');
            const parsed = parseFloat(newValue);
            if (isNaN(parsed)) {
                alert('Value invalid');
                return;
            }
            yield arr.linearSearch(parsed);
        })
    },
    {
        title: 'Insert',
        action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            const newValue = parseFloat(yield simulation.prompt('Which value to insert'));
            const index = parseFloat(yield simulation.prompt('Dje bate?'));
            if (isNaN(newValue) || isNaN(index)) {
                alert('Value invalid');
                return;
            }
            const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](newValue, -1, arr.x, arr.y - 200);
            simulation.nodeHandler.add(node);
            yield arr.insertAt(node, index);
        })
    },
    {
        title: 'Delete',
        action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            const index = parseFloat(yield simulation.prompt('Which index would you like to remove?'));
            if (isNaN(index)) {
                alert('Value invalid');
                return;
            }
            yield arr.deleteAt(index);
        })
    },
    {
        divider: true
    },
    {
        title: 'Sort',
        children: [
            {
                title: 'Insertion',
                action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
                    arr.sorting = new _structures_array_insertion_sort__WEBPACK_IMPORTED_MODULE_2__["InsertionSort"]();
                    yield arr.sort();
                })
            },
            {
                title: 'Selection',
                action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
                    arr.sorting = new _structures_array_selection_sort__WEBPACK_IMPORTED_MODULE_3__["SelectionSort"]();
                    yield arr.sort();
                })
            },
            {
                title: 'Bubble',
                action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
                    arr.sorting = new _structures_array_bubble_sort__WEBPACK_IMPORTED_MODULE_4__["BubbleSort"]();
                    yield arr.sort();
                })
            },
            {
                title: 'Merge',
                action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
                    arr.sorting = new _structures_array_merge_sort__WEBPACK_IMPORTED_MODULE_5__["MergeSort"]();
                    yield arr.sort();
                })
            },
            {
                title: 'Quick',
                action: (arr) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
                    arr.sorting = new _structures_array_quick_sort__WEBPACK_IMPORTED_MODULE_6__["QuickSort"]();
                    yield arr.sort();
                })
            }
        ]
    }
];


/***/ }),

/***/ "SULx":
/*!********************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/insertion-sort.ts ***!
  \********************************************************************/
/*! exports provided: InsertionSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertionSort", function() { return InsertionSort; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class InsertionSort {
    sort(arr) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            arr.data[0].highlight('#98dc73');
            for (let i = 1; i < arr.size; ++i) {
                const node = arr.data[i].removeNode();
                node.setTarget(arr.data[i].absoluteX, arr.data[i].absoluteY - 150);
                yield new Promise(r => setTimeout(r, 1200));
                let j = i - 1;
                while (j >= 0) {
                    arr.data[j].highlight('#fdd828');
                    yield new Promise(r => setTimeout(r, 1200));
                    node.setTarget(arr.data[j].absoluteX, arr.data[j].absoluteY - 150);
                    arr.data[j].highlight('#98dc73');
                    if (node.value >= arr.data[j].node.value) {
                        break;
                    }
                    yield arr.moveNode(arr.data[j], arr.data[j + 1]);
                    --j;
                }
                node.setTarget(arr.data[j + 1].absoluteX, arr.data[j + 1].absoluteY);
                yield new Promise(r => setTimeout(r, 1200));
                arr.data[j + 1].addNode(node);
                arr.data[i].highlight('#98dc73');
            }
        });
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primeng/api */ "7zfz");
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/toast */ "Gxio");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AppComponent {
    constructor(primeNgConfig) {
        this.primeNgConfig = primeNgConfig;
        this.title = 'Alharismi';
    }
    ngOnInit() {
        this.primeNgConfig.ripple = true;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_1__["PrimeNGConfig"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 1, consts: [[3, "baseZIndex"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "p-toast", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("baseZIndex", 10000);
    } }, directives: [primeng_toast__WEBPACK_IMPORTED_MODULE_2__["Toast"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "T8p/":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/stack-menu.ts ***!
  \*************************************************************/
/*! exports provided: stackMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stackMenu", function() { return stackMenu; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../basics/simulation-node */ "Q48m");


const stackMenu = (simulation) => [
    {
        title: 'Change name',
        action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            elm.descriptor = yield simulation.prompt('New name');
        })
    },
    {
        // divider
        divider: true
    },
    {
        title: 'Push',
        action: (stack) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            const newValue = parseFloat(yield simulation.prompt('Which value to insert'));
            if (isNaN(newValue)) {
                alert('Value invalid');
                return;
            }
            const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](newValue, -1, stack.x, stack.y - 200);
            simulation.nodeHandler.add(node);
            yield stack.push(node);
        })
    },
    {
        title: 'Pop',
        action: (stack) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            yield stack.pop();
        })
    }
];


/***/ }),

/***/ "T9kh":
/*!*****************************************************!*\
  !*** ./src/scenarios/linked-list/scenes/prepend.ts ***!
  \*****************************************************/
/*! exports provided: Prepend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prepend", function() { return Prepend; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class Prepend {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
        this.newElement = 23.11;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0);
            simulation.linkedListHandler.add(this.list);
            for (const node of nodes) {
                yield this.list.append(node, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.newElement, -1, this.list.x, this.list.y - 200);
            simulation.nodeHandler.add(node);
            yield this.list.prepend(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linked list - prepend</h1>
  <p>
    One main advantage of linked lists over arrays is that it is possible to add an
    element to the beginning of a list without moving any other node.
  </p>
  <p>
    Since nodes might be scattered everywhere in the memory, a new node is added and:
  </p>
  <ul>
    <li>
      <em>Head</em> now references the new node;
    </li>
    <li>
      The new node references previous first node.
    </li>
  </ul>
  <p>
    Now, let's add ${this.newElement} to the beginning of the linked list.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.newElement} is now added to the linked list, it is referenced by <em>head</em> and it
    references the same node <em>head</em> was referencing prior to this insertion.
  </p>
    `;
    }
}


/***/ }),

/***/ "UJzJ":
/*!**************************************************************!*\
  !*** ./src/scenarios/rb-tree/scenes/insertion-first-case.ts ***!
  \**************************************************************/
/*! exports provided: InsertionFirstCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertionFirstCase", function() { return InsertionFirstCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class InsertionFirstCase {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toAdd = 2.31;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = this.createNodes(simulation, [20, 10, 30]);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('rb', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
        });
    }
    createNodes(simulation, values) {
        const nodes = [];
        for (const value of values) {
            nodes.push(simulation.objectFactory.create('node', 0, 0, value));
        }
        return nodes;
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = simulation.objectFactory.create('node', this.bst.x, this.bst.y - 200, this.toAdd);
            simulation.nodeHandler.add(node);
            yield this.bst.insert(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion - first case</h1>
  <p>
    Since Red-black tree is a type of Binary search tree, insertion is quite similar.
  </p>
  <p>
    Essential difference lies in operations after the actual insertion. At that point,
    the tree might become unbalanced, i.e. some of the previously mentioned properties of a
    red-black tree might become compromised.
  </p>
  <p>
    Firstly, the newly inserted node is colored red, and properties of the tree are checked afterwards.
    If the parent of our newly inserted node is black, then we don't need to restructure the tree.
    However, if its parent is colored red, then there are three cases we need to check for.
  </p>
  <p>
    The first case occurs if new node's uncle (parent's sibling) is <span style="color: #bb4848;">red</span>.
    Then, both of those nodes should be colored in black and their parent (new node's grandparent) should be
    colored red.
  </p>
  <p>
    This recoloring procedure then propagates up the tree to our new node's grandparent, where everything is checked
    for again.
  </p>
  <small>If our new node's grandparent was root, then we will recolor it back to black no matter what.</small>
  <p>
    Let's now see this case on the tree on the right-hand side by inserting ${this.toAdd}.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    All the properties of red-black tree are restored now by performing recoloring.
  </p>
  <small>Since our new node's grandparent was root, it was recolored to black.</small>
    `;
    }
}


/***/ }),

/***/ "UMtZ":
/*!**********************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/simulation-queue.ts ***!
  \**********************************************************************/
/*! exports provided: SimulationQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationQueue", function() { return SimulationQueue; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _simulation_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./simulation-array */ "oN2I");


class SimulationQueue extends _simulation_array__WEBPACK_IMPORTED_MODULE_1__["SimulationArray"] {
    enqueue(node, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.capacity === this.size) {
                throw new Error('Queue is full');
            }
            let insertPosition;
            if (this.right) {
                insertPosition = (this.right.id + 1) % this.capacity;
            }
            else {
                insertPosition = 0;
            }
            yield this.insertAt(node, insertPosition, animate);
            yield this.setRight(insertPosition, animate);
            if (!this.left) {
                yield this.setLeft(insertPosition, animate);
            }
        });
    }
    setRight(position, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!!this.right && this.right !== this.left) {
                this.right.resetColor();
            }
            else if (!!this.right) {
                this.right.highlight('#a0ff6f');
            }
            if (this.size - 1 < 0) {
                return;
            }
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            this.right = this.data[position];
            this.right.highlight('#ff9494');
        });
    }
    dequeue(animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.size === 0) {
                throw new Error('Queue is empty');
            }
            const node = this.left.removeNode();
            --this.size;
            node.setTarget(this.x, this.y - 200);
            const newPosition = (this.left.id + 1) % this.capacity;
            yield this.setLeft(newPosition, animate);
        });
    }
    setLeft(position, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!!this.left) {
                this.left.resetColor();
            }
            if (this.size - 1 < 0) {
                return;
            }
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            this.left = this.data[position];
            this.left.highlight('#a0ff6f');
        });
    }
}


/***/ }),

/***/ "Uxho":
/*!***************************************************!*\
  !*** ./src/scenarios/rb-tree/scenes/red-black.ts ***!
  \***************************************************/
/*! exports provided: RedBlack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedBlack", function() { return RedBlack; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class RedBlack {
    constructor() {
        this.id = 0;
        this.played = 'unplayable';
        this.rootValue = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            const bst = simulation.objectFactory.create('rb', 0, 0);
            simulation.bstHandler.add(bst);
            for (const node of nodes) {
                yield bst.insert(node, false);
            }
            this.rootValue = bst.getRoot().node.value;
        });
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Red-black tree</h1>
  <p>
    In the previous section, there was one disadvantageous property of a Binary search tree. That is,
    if nodes were added in a specific order, tree might become unbalanced and many of its nodes
    would lean to one side, thus reducing effectiveness of the tree and making it perform more
    like a linked list.
  </p>
  <p>
    Therefore, Red-black trees are implemented in order to eliminate that imbalance which is present in
    an ordinary Binary search tree. After every insertion or deletion, some form of rebalancing is performed
    in order to make tree more effective.
  </p>
  <p>
    Red-black trees have all the properties an ordinary binary search trees have, and additionaly:
  </p>
  <ul>
    <li>
      The <span style="color: #868686;">root</span> is black;
    </li>
    <li>
      All children of a <span style="color: #bb4848;">red node</span> are <span style="color: #868686;">black</span>;
    </li>
    <li>
      For each node, any simple path from this node to any of its descendant leaf has the same number of black nodes;
    </li>
    <li>
        All leaves are <span style="color: #868686;">black</span>.
    </li>
  </ul>
  <p>
    As searching works the same as in an ordinary binary search tree, only insertion and deletion will be presented.
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "Vpx9":
/*!***********************************************!*\
  !*** ./src/scenarios/heap/scenes/find-min.ts ***!
  \***********************************************/
/*! exports provided: FindMin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindMin", function() { return FindMin; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class FindMin {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.minValue = -1;
        this.newRootValue = -1;
        this.newProperRootValue = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.heap = simulation.objectFactory.create('heap', 0, 0);
            simulation.heapHandler.add(this.heap);
            for (const node of nodes) {
                yield this.heap.insert(node, false);
            }
            this.minValue = this.heap.getRoot().node.value;
            this.newRootValue = this.heap._data[this.heap.size - 2].node.value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.heap.deleteNodeFromCell(this.heap.getRoot());
            this.newProperRootValue = this.heap.getRoot().node.value;
        });
    }
    content() {
        return `
  <h1 class="scene-title">Extract minimum</h1>
  <p>
    As the tree on the right-hand side is a min-heap, a node with the minimum value can
    be found in the heap's root.
  </p>
  <p>
    Extraction isn't that complicated:
  </p>
  <ol>
    <li>
      Swap the root node with the last leaf, which contains value ${this.newRootValue};
    </li>
    <li>
      Extract value from the last leaf, which is now minimum ${this.minValue};
    </li>
    <li>
      Propagate new root value down the heap, in order to restore heap order.
    </li>
  </ol>
  <p>
    Press play to see how that works in practice!
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Order of the heap is successfully restored and ${this.newRootValue} was
    propagated down the tree, so ${this.newProperRootValue} became the new root value by
    swapping nodes all the way down the heap.
  </p>
    `;
    }
}


/***/ }),

/***/ "Vz4i":
/*!**********************************************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/binary-tree/red-black-tree/red-black-tree.ts ***!
  \**********************************************************************************************/
/*! exports provided: RedBlackTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedBlackTree", function() { return RedBlackTree; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _binary_search_tree_binary_search_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../binary-search-tree/binary-search-tree */ "LVtG");


var Color;
(function (Color) {
    Color["RED"] = "#FF5A5A94";
    Color["BLACK"] = "#636363FF";
})(Color || (Color = {}));
class RedBlackTree extends _binary_search_tree_binary_search_tree__WEBPACK_IMPORTED_MODULE_1__["BinarySearchTree"] {
    constructor(id, x, y) {
        super(id, x, y);
        this.colors = {};
    }
    addCell(cell, parent, left = true) {
        super.addCell(cell, parent, left);
        cell.descriptorColor = '#d2cdc8';
        this.setColor(cell, Color.BLACK);
    }
    add(d, bstCell, animate = true) {
        const _super = Object.create(null, {
            add: { get: () => super.add }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield _super.add.call(this, d, bstCell);
            if (this.isValid) {
                this.setColor(bstCell, Color.RED);
                yield this.insertionCheckBalance(bstCell, animate);
            }
        });
    }
    delete(value, animate = true) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const [node, affectedCell, deletedCell] = yield _super.delete.call(this, value, animate);
            yield this.deletionCheckBalance(affectedCell, deletedCell, animate);
            return [node, affectedCell, deletedCell];
        });
    }
    /**
     * Used to check balance of the tree after insertion.
     * Checks the colors of the starting cell and its ancestors if necessary, thus checking if all the nodes are balanced.
     * If an unbalanced node shows up, performs operations of balancing.
     * @param cell - The starting cell.
     * @private
     */
    insertionCheckBalance(cell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let [parent, childIndex] = this.getParent(cell);
            while (this.getColor(parent) === Color.RED) {
                let [grandParent, parentIndex] = this.getParent(parent);
                if (cell.isRoot) {
                    break;
                }
                if (parentIndex === 0) { // if parent is the left child
                    const uncle = this.getRightChild(grandParent);
                    if (this.getColor(uncle) === Color.RED) {
                        // uncle is red
                        this.setColor(parent, Color.BLACK);
                        this.setColor(uncle, Color.BLACK);
                        this.setColor(grandParent, Color.RED);
                        cell = grandParent;
                        [parent, childIndex] = this.getParent(cell);
                    }
                    else {
                        // uncle is black
                        if (childIndex === 1) {
                            // currentCell is the right child
                            cell = parent;
                            [parent, childIndex] = [grandParent, parentIndex];
                            [grandParent, parentIndex] = this.getParent(parent);
                            yield this.leftRotation(cell, animate);
                            [parent, childIndex] = this.getParent(cell);
                            [grandParent, parentIndex] = this.getParent(parent);
                        }
                        this.setColor(parent, Color.BLACK);
                        this.setColor(grandParent, Color.RED);
                        yield this.rightRotation(grandParent, animate);
                        [parent, childIndex] = this.getParent(cell);
                        [grandParent, parentIndex] = this.getParent(parent);
                    }
                }
                else { // if the parent is the right child
                    const uncle = this.getLeftChild(grandParent);
                    if (this.getColor(uncle) === Color.RED) {
                        // uncle is red
                        this.setColor(parent, Color.BLACK);
                        this.setColor(uncle, Color.BLACK);
                        this.setColor(grandParent, Color.RED);
                        cell = grandParent;
                        [parent, childIndex] = this.getParent(cell);
                    }
                    else {
                        // uncle is black
                        if (childIndex === 0) {
                            // currentCell is the left child
                            cell = parent;
                            [parent, childIndex] = [grandParent, parentIndex];
                            [grandParent, parentIndex] = this.getParent(parent);
                            yield this.rightRotation(cell, animate);
                            [parent, childIndex] = this.getParent(cell);
                            [grandParent, parentIndex] = this.getParent(parent);
                        }
                        [parent, childIndex] = this.getParent(cell);
                        [grandParent, parentIndex] = this.getParent(parent);
                        this.setColor(parent, Color.BLACK);
                        this.setColor(grandParent, Color.RED);
                        yield this.leftRotation(grandParent, animate);
                        [parent, childIndex] = this.getParent(cell);
                        [grandParent, parentIndex] = this.getParent(parent);
                    }
                }
            }
            const treeRoot = this.getRoot();
            this.setColor(treeRoot, Color.BLACK);
        });
    }
    /**
     * Used to check balance of the tree after deletion.
     */
    deletionCheckBalance(affectedCell, deletedCell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let [parent, childIndex] = this.getParent(affectedCell);
            let cell = deletedCell;
            while (!cell.isRoot && this.getColor(cell) === Color.BLACK) {
                if (childIndex === 0) {
                    // if currentCell is a left node to its parent
                    let sibling = this.getRightChild(parent);
                    let siblingsColor = this.getColor(sibling);
                    if (siblingsColor && siblingsColor === Color.RED) {
                        this.setColor(sibling, Color.BLACK);
                        this.setColor(parent, Color.RED);
                        yield this.leftRotation(parent, animate);
                        sibling = this.getRightChild(parent);
                        siblingsColor = this.getColor(sibling);
                    }
                    let leftNephew = this.getLeftChild(sibling);
                    let rightNephew = this.getRightChild(sibling);
                    let leftNephewColor = this.getColor(leftNephew);
                    let rightNephewColor = this.getColor(rightNephew);
                    if (leftNephewColor && leftNephewColor === Color.BLACK
                        && rightNephewColor && rightNephewColor === Color.BLACK) {
                        this.setColor(sibling, Color.RED);
                        cell = parent;
                        [parent, childIndex] = this.getParent(cell);
                        sibling = this.getRightChild(parent);
                        siblingsColor = this.getColor(sibling);
                        leftNephew = this.getLeftChild(sibling);
                        rightNephew = this.getRightChild(sibling);
                        leftNephewColor = this.getColor(leftNephew);
                        rightNephewColor = this.getColor(rightNephew);
                    }
                    else {
                        if (rightNephewColor === Color.BLACK) {
                            this.setColor(leftNephew, Color.BLACK);
                            this.setColor(sibling, Color.RED);
                            yield this.rightRotation(sibling, animate);
                            [parent, childIndex] = this.getParent(cell);
                            sibling = this.getRightChild(parent);
                            siblingsColor = this.getColor(sibling);
                            rightNephew = this.getRightChild(sibling);
                        }
                        const parentColor = this.getColor(parent);
                        this.setColor(sibling, parentColor);
                        this.setColor(parent, Color.BLACK);
                        this.setColor(rightNephew, Color.BLACK);
                        yield this.leftRotation(parent, animate);
                        cell = this.getRoot();
                    }
                }
                else {
                    // if currentCell is a right node to its parent
                    let sibling = this.getLeftChild(parent);
                    let siblingsColor = this.getColor(sibling);
                    if (siblingsColor && siblingsColor === Color.RED) {
                        this.setColor(sibling, Color.BLACK);
                        this.setColor(parent, Color.RED);
                        yield this.rightRotation(parent, animate);
                        sibling = this.getLeftChild(parent);
                        siblingsColor = this.getColor(sibling);
                    }
                    let rightNephew = this.getRightChild(sibling);
                    let leftNephew = this.getLeftChild(sibling);
                    let rightNephewColor = this.getColor(rightNephew);
                    let leftNephewColor = this.getColor(leftNephew);
                    if (rightNephewColor && rightNephewColor === Color.BLACK
                        && leftNephewColor && leftNephewColor === Color.BLACK) {
                        this.setColor(sibling, Color.RED);
                        cell = parent;
                        [parent, childIndex] = this.getParent(cell);
                        sibling = this.getLeftChild(parent);
                        siblingsColor = this.getColor(sibling);
                        rightNephew = this.getRightChild(sibling);
                        leftNephew = this.getLeftChild(sibling);
                        rightNephewColor = this.getColor(rightNephew);
                        leftNephewColor = this.getColor(leftNephew);
                    }
                    else {
                        if (leftNephewColor === Color.BLACK) {
                            this.setColor(rightNephew, Color.BLACK);
                            this.setColor(sibling, Color.RED);
                            yield this.leftRotation(sibling, animate);
                            sibling = this.getLeftChild(parent);
                            siblingsColor = this.getColor(sibling);
                            leftNephew = this.getLeftChild(sibling);
                        }
                        const parentColor = this.getColor(parent);
                        this.setColor(sibling, parentColor);
                        this.setColor(parent, Color.BLACK);
                        this.setColor(leftNephew, Color.BLACK);
                        yield this.rightRotation(parent, animate);
                        cell = this.getRoot();
                    }
                }
            }
            this.setColor(cell, Color.BLACK);
        });
    }
    leftRotation(rotationRoot, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const newRoot = this.getRightChild(rotationRoot);
            const t = this.getLeftChild(newRoot);
            // Perform rotation
            this.linkHelper.removeLink(newRoot, t);
            this.setRightChild(rotationRoot, t);
            this.linkHelper.addLink(rotationRoot, t);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            const [rootParent, childIndex] = this.getParent(rotationRoot);
            this.detachParent(rotationRoot);
            this.linkHelper.removeLink(rootParent, rotationRoot);
            if (!rootParent) {
                newRoot.isRoot = true;
                newRoot.setDefaultDescriptor(rotationRoot.defaultDescriptor);
                rotationRoot.setDefaultDescriptor(undefined);
                rotationRoot.isRoot = false;
            }
            if (childIndex === 0) {
                this.setLeftChild(rootParent, newRoot);
            }
            else {
                this.setRightChild(rootParent, newRoot);
            }
            if (!!rootParent) {
                this.linkHelper.addLink(rootParent, newRoot);
            }
            // this.alignForces();
            // if (animate) {
            //   await new Promise(r => setTimeout(r, 600));
            // }
            this.linkHelper.removeLink(rotationRoot, newRoot);
            this.setLeftChild(newRoot, rotationRoot);
            this.linkHelper.addLink(newRoot, rotationRoot);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
        });
    }
    rightRotation(rotationRoot, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const newRoot = this.getLeftChild(rotationRoot);
            const t = this.getRightChild(newRoot);
            // Perform rotation
            this.linkHelper.removeLink(newRoot, t);
            this.setLeftChild(rotationRoot, t);
            this.linkHelper.addLink(rotationRoot, t);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            const [rootParent, childIndex] = this.getParent(rotationRoot);
            this.detachParent(rotationRoot);
            this.linkHelper.removeLink(rootParent, rotationRoot);
            if (!rootParent) {
                newRoot.isRoot = true;
                newRoot.setDefaultDescriptor(rotationRoot.defaultDescriptor);
                rotationRoot.setDefaultDescriptor(undefined);
                rotationRoot.isRoot = false;
            }
            if (childIndex === 0) {
                this.setLeftChild(rootParent, newRoot);
            }
            else {
                this.setRightChild(rootParent, newRoot);
            }
            if (!!rootParent) {
                this.linkHelper.addLink(rootParent, newRoot);
            }
            this.linkHelper.removeLink(rotationRoot, newRoot);
            this.setRightChild(newRoot, rotationRoot);
            this.linkHelper.addLink(newRoot, rotationRoot);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
        });
    }
    getColor(cell) {
        if (!cell) {
            return undefined;
        }
        if (!this.colors[cell.id]) {
            return Color.BLACK;
        }
        return this.colors[cell.id];
    }
    setColor(cell, color) {
        if (!cell) {
            return;
        }
        this.colors[cell.id] = color;
        cell.setDefaultColor(color);
    }
    deleteCell(cell) {
        super.deleteCell(cell);
        this.setColor(cell, Color.BLACK);
    }
}


/***/ }),

/***/ "WW+/":
/*!******************************************************!*\
  !*** ./src/scenarios/linked-list/scenes/pop-last.ts ***!
  \******************************************************/
/*! exports provided: PopLast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopLast", function() { return PopLast; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class PopLast {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
        this.toPop = -1;
        this.newLast = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0);
            simulation.linkedListHandler.add(this.list);
            for (const node of nodes) {
                yield this.list.append(node, false);
            }
            this.toPop = nodes[nodes.length - 1].value;
            this.newLast = nodes[nodes.length - 2].value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.list.popLast();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linked list - pop the last node</h1>
  <p>
    In order to remove the element which is placed at the end of a linked list,
    the process is quite complicated.
  </p>
  <p>
    Since it is impossible to directly get the predecessor of ${this.toPop},
    the entire linked list has to be traversed in order to find a node which
    references ${this.toPop}. That node is its predecessor
  </p>
  <p>
    The steps required in order to delete an element from the end of the linked list are:
  </p>
  <ul>
    <li>
      Get the node referenced by <em>tail</em>, which is ${this.toPop};
    </li>
    <li>
      Iterate and find its predecessor, that is ${this.newLast};
    </li>
    <li>
      Delete predecessor's reference and set <em>tail</em> to reference predecessor.
    </li>
  </ul>
  <p>
    Press play in order to see how all of that works in practice.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.toPop} is now popped from the linked list and node with value
    ${this.newLast} is referenced by <em>tail</em>, but it doesn't reference any node at all.
  </p>
    `;
    }
}


/***/ }),

/***/ "Wtot":
/*!***************************************************!*\
  !*** ./src/scenarios/stack-queue/scenes/queue.ts ***!
  \***************************************************/
/*! exports provided: Queue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queue", function() { return Queue; });
class Queue {
    constructor() {
        this.id = 3;
        this.played = 'unplayable';
    }
    setup(simulation) {
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Queue</h1>
  <p>
    Let's talk about <b>queues</b>.
  </p>
  <p>
    A queue is a data structure that follows the principle of First-In-First-Out (FIFO).
    This means the first element inserted inside the queue is removed first.
  </p>
  <p>
    A queue can be imagined as a train going through a tunnel. The first car that
    entered the tunnel is going to be the first one to exit it.
  </p>
  <p>
    In order to see a train car from the middle of the train exit the tunnel, it is necessary
    to observe all the cars that entered the tunnel prior to the target car.
  </p>
  <p>
    In this section, we'll see how queues can be implemented using arrays.
  </p>
  <p>
    Let's get started :)
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "XGK1":
/*!*****************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/bst-cell-mouse.ts ***!
  \*****************************************************************/
/*! exports provided: BstCellMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BstCellMouse", function() { return BstCellMouse; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class BstCellMouse {
    constructor(simulation, colorProvider) {
        this.simulation = simulation;
        this.colorProvider = colorProvider;
    }
    mouseOver(d, i, nodes) {
        d.isMouseOver = true;
        const draggedNode = this.simulation.loop.draggedNode;
        const innerNode = d.node;
        const treeValid = d.graph.isValid;
        let color;
        if (!treeValid) {
            color = '#8d1a1a';
        }
        else if (!!innerNode) {
            color = this.colorProvider.getNodeColor(innerNode);
        }
        else if (!!draggedNode) {
            color = this.colorProvider.getNodeColor(draggedNode);
        }
        else {
            color = '#ACBFA4';
        }
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](nodes[i])
            .select('.bst-cell-circle')
            .style('stroke', color)
            .transition()
            .duration(600)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeElastic"])
            .style('stroke-width', 7);
        if (!draggedNode || !!innerNode || !treeValid) {
            return;
        }
        this.simulation.loop.draggedNode.hoveringPlaceholder = d;
        d.hoveringNode = this.simulation.loop.draggedNode;
    }
    mouseOut(d, i, nodes) {
        d.isMouseOver = false;
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](nodes[i])
            .select('.bst-cell-circle')
            .transition()
            .duration(600)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeElastic"])
            .style('stroke-width', 0);
        const draggedNode = this.simulation.loop.draggedNode;
        const innerNode = d.node;
        const treeValid = d.graph.isValid;
        if (!draggedNode || !!innerNode || !treeValid) {
            return;
        }
        if (d.hoveringNode !== d.node) {
            d.hoveringNode = d.node;
        }
        else {
            d.hoveringNode = undefined;
        }
        this.simulation.loop.draggedNode.hoveringPlaceholder = null;
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element
            .on('mouseover', (d, i, nodes) => this.mouseOver(d, i, nodes))
            .on('mouseout', (d, i, nodes) => this.mouseOut(d, i, nodes));
        return element;
    }
}


/***/ }),

/***/ "YO5I":
/*!******************************************************!*\
  !*** ./src/scenarios/linked-list/scenes/deletion.ts ***!
  \******************************************************/
/*! exports provided: Deletion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deletion", function() { return Deletion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class Deletion {
    constructor() {
        this.id = 3;
        this.played = 'not_played';
        this.toDelete = -1;
        this.deletionIndex = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0);
            simulation.linkedListHandler.add(this.list);
            for (const node of nodes) {
                yield this.list.append(node, false);
            }
            this.deletionIndex = Math.floor(nodes.length / 2);
            this.toDelete = nodes[this.deletionIndex].value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.list.delete(this.deletionIndex);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linked list - deletion at a given index</h1>
  <p>
    Deleting an element from the linked list is performed similarly to deleting
    from the beginning, with the exception that the element at the given index
    must be found prior to that.
  </p>
  <p>
    Finding an element at a given index has to be performed by
    traversing successors and counting how many nodes were passed at every
    given iteration.
  </p>
  <p>
    After finding an element at a given index, deletion consists of one step where
    predecessor of the <em>target</em> node now references <em>target</em> node's
    successor.
  </p>
  <p>
    Now, let's delete element at the index ${this.deletionIndex}.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.toDelete} is now deleted from the index ${this.deletionIndex} of the linked list.
  </p>
    `;
    }
}


/***/ }),

/***/ "YOyK":
/*!******************************************************!*\
  !*** ./src/scenarios/arrays/scenes/insertion-end.ts ***!
  \******************************************************/
/*! exports provided: InsertionEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertionEnd", function() { return InsertionEnd; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class InsertionEnd {
    constructor() {
        this.id = 3;
        this.played = 'not_played';
        this.arrElement = -1;
        this.index = -1;
        this.arrSize = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            this.arrElement = 23.11;
            this.index = this.array.size;
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.arrElement, -1, this.array.x, this.array.y - 200);
            simulation.nodeHandler.add(node);
            yield this.array.insertAt(node, this.index);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion at the end of an array</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    Now, let's append ${this.arrElement} to the array.
  </p>
  <p>
    Are there any special steps that we need to perform prior to inserting this element at the index [${this.index}]?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    Obviously, there weren't any necessary steps prior to this insertion.
    The algorithm has simply determined that there were no elements at the index
    [${this.index}], and thus only placed ${this.arrElement} there.
  </p>
  `;
    }
}


/***/ }),

/***/ "Z/hl":
/*!***************************************************!*\
  !*** ./src/app/core/services/scenario.service.ts ***!
  \***************************************************/
/*! exports provided: ScenarioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScenarioService", function() { return ScenarioService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _simulation_simulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../simulation/simulation */ "wbhT");
/* harmony import */ var _scenarios_scenarios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../scenarios/scenarios */ "lS7s");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");





class ScenarioService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.currentScenario = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](undefined);
        this.scenarios = _scenarios_scenarios__WEBPACK_IMPORTED_MODULE_2__["scenarios"];
    }
    initSimulation(canvas, widthHeight, prompt) {
        this.simulation = new _simulation_simulation__WEBPACK_IMPORTED_MODULE_1__["Simulation"](canvas, prompt);
        this.simulation.widthHeight.next(widthHeight);
    }
    startSimulation(svg) {
        var _a;
        (_a = this.simulation) === null || _a === void 0 ? void 0 : _a.startSimulation(svg);
    }
    updateWidthHeight(widthHeight) {
        this.simulation.widthHeight.next(widthHeight);
    }
}
ScenarioService.ɵfac = function ScenarioService_Factory(t) { return new (t || ScenarioService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); };
ScenarioService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ScenarioService, factory: ScenarioService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _view_main_frame_main_frame_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/main-frame/main-frame.component */ "/u1V");
/* harmony import */ var primeng_menubar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/menubar */ "b1Ni");
/* harmony import */ var _view_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/navbar/navbar.component */ "hB21");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/button */ "jIHw");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "7zfz");
/* harmony import */ var _view_scenario_grid_scenario_grid_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view/scenario-grid/scenario-grid.component */ "I0+v");
/* harmony import */ var primeng_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/card */ "QIUk");
/* harmony import */ var _view_scene_view_scene_view_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./view/scene-view/scene-view.component */ "biAk");
/* harmony import */ var primeng_ripple__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/ripple */ "Q4Mo");
/* harmony import */ var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/overlaypanel */ "z8Lm");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/inputtext */ "7kUa");
/* harmony import */ var primeng_slider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/slider */ "+la4");
/* harmony import */ var primeng_inputnumber__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/inputnumber */ "Ks7X");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _view_content_view_content_view_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./view/content-view/content-view.component */ "COz+");
/* harmony import */ var primeng_skeleton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/skeleton */ "jeV5");
/* harmony import */ var _view_visualization_view_visualization_view_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./view/visualization-view/visualization-view.component */ "l53U");
/* harmony import */ var primeng_toast__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/toast */ "Gxio");
/* harmony import */ var primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/scrollpanel */ "SSqW");
/* harmony import */ var _view_playground_playground_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./view/playground/playground.component */ "8Gdb");
/* harmony import */ var _view_prompt_prompt_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./view/prompt/prompt.component */ "1yNI");
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/dynamicdialog */ "J7/z");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/core */ "fXoL");




























class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        primeng_api__WEBPACK_IMPORTED_MODULE_8__["MessageService"],
        primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_26__["DialogService"]
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_18__["HttpClientModule"],
            primeng_menubar__WEBPACK_IMPORTED_MODULE_3__["MenubarModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
            primeng_button__WEBPACK_IMPORTED_MODULE_7__["ButtonModule"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            primeng_card__WEBPACK_IMPORTED_MODULE_10__["CardModule"],
            primeng_ripple__WEBPACK_IMPORTED_MODULE_12__["RippleModule"],
            primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_13__["OverlayPanelModule"],
            primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__["InputTextModule"],
            primeng_slider__WEBPACK_IMPORTED_MODULE_16__["SliderModule"],
            primeng_inputnumber__WEBPACK_IMPORTED_MODULE_17__["InputNumberModule"],
            primeng_skeleton__WEBPACK_IMPORTED_MODULE_20__["SkeletonModule"],
            primeng_toast__WEBPACK_IMPORTED_MODULE_22__["ToastModule"],
            primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_23__["ScrollPanelModule"],
            primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_26__["DynamicDialogModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_27__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _view_main_frame_main_frame_component__WEBPACK_IMPORTED_MODULE_2__["MainFrameComponent"],
        _view_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"],
        _view_scenario_grid_scenario_grid_component__WEBPACK_IMPORTED_MODULE_9__["ScenarioGridComponent"],
        _view_scene_view_scene_view_component__WEBPACK_IMPORTED_MODULE_11__["SceneViewComponent"],
        _view_content_view_content_view_component__WEBPACK_IMPORTED_MODULE_19__["ContentViewComponent"],
        _view_visualization_view_visualization_view_component__WEBPACK_IMPORTED_MODULE_21__["VisualizationViewComponent"],
        _view_playground_playground_component__WEBPACK_IMPORTED_MODULE_24__["PlaygroundComponent"],
        _view_prompt_prompt_component__WEBPACK_IMPORTED_MODULE_25__["PromptComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__["BrowserAnimationsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_18__["HttpClientModule"],
        primeng_menubar__WEBPACK_IMPORTED_MODULE_3__["MenubarModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
        primeng_button__WEBPACK_IMPORTED_MODULE_7__["ButtonModule"],
        primeng_api__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
        primeng_card__WEBPACK_IMPORTED_MODULE_10__["CardModule"],
        primeng_ripple__WEBPACK_IMPORTED_MODULE_12__["RippleModule"],
        primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_13__["OverlayPanelModule"],
        primeng_inputtext__WEBPACK_IMPORTED_MODULE_15__["InputTextModule"],
        primeng_slider__WEBPACK_IMPORTED_MODULE_16__["SliderModule"],
        primeng_inputnumber__WEBPACK_IMPORTED_MODULE_17__["InputNumberModule"],
        primeng_skeleton__WEBPACK_IMPORTED_MODULE_20__["SkeletonModule"],
        primeng_toast__WEBPACK_IMPORTED_MODULE_22__["ToastModule"],
        primeng_scrollpanel__WEBPACK_IMPORTED_MODULE_23__["ScrollPanelModule"],
        primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_26__["DynamicDialogModule"]] }); })();


/***/ }),

/***/ "ZY5H":
/*!***************************************************!*\
  !*** ./src/scenarios/stack-queue/scenes/stack.ts ***!
  \***************************************************/
/*! exports provided: Stack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return Stack; });
class Stack {
    constructor() {
        this.id = 0;
        this.played = 'unplayable';
    }
    setup(simulation) {
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Stack</h1>
  <p>
    Let's talk about <b>stacks</b>.
  </p>
  <p>
    A stack is a data structure that follows the principle of Last-In-First-Out (LIFO).
    This means the last element inserted inside the stack is removed first.
  </p>
  <p>
    A stack can be imagined as a pile of CDs. A new CD may be put on top of the pile, and
    thus it is the first one to be picked up later.
  </p>
  <p>
    In order to access a CD from the middle of the CD stack, it is necessary
    to pick all other discs that are placed over our target CD.
  </p>
  <p>
    In this section, we'll see how stacks can be implemented using arrays.
  </p>
  <p>
    Let's get started :)
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "bJYZ":
/*!*****************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/heap-drawing.ts ***!
  \*****************************************************************/
/*! exports provided: HeapDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeapDrawing", function() { return HeapDrawing; });
class HeapDrawing {
    enter(enterElement) {
        const treeElement = enterElement.append('g')
            .attr('class', 'heap');
        return treeElement;
    }
    update(updateElement) {
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
}


/***/ }),

/***/ "bLjw":
/*!**************************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/binary-tree/heap/heap.ts ***!
  \**************************************************************************/
/*! exports provided: Heap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Heap", function() { return Heap; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _binary_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../binary-tree */ "MDJh");
/* harmony import */ var _bst_cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../bst-cell */ "r+2I");



class Heap extends _binary_tree__WEBPACK_IMPORTED_MODULE_1__["BinaryTree"] {
    constructor(id, x, y) {
        super(id, x, y);
        this._data = [];
        this.size = 0;
    }
    addCell(cell, parent, left) {
        this.setCell(cell, ++this.size);
    }
    add(d, bstCell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            bstCell.setNode(d);
            d.lockedPlaceholder = bstCell;
            this.addNextCell(bstCell);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            yield this.upHeap(bstCell, this.size - 2, animate);
        });
    }
    addNextCell(cell) {
        const nextCell = new _bst_cell__WEBPACK_IMPORTED_MODULE_2__["BstCell"](this, this.maxId++, cell.x, cell.y);
        this.addCell(nextCell);
        const [parent] = this.getParent(nextCell, this.size);
        if (!!parent) {
            this.linkHelper.addLink(parent, nextCell);
        }
    }
    upHeap(cell, index, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let [parent] = this.getParent(cell, index);
            const root = this.getRoot();
            while (cell !== root) {
                if (cell.node.value < parent.node.value) {
                    yield this.swapNodes(cell, parent, animate);
                }
                cell = parent;
                index = Math.floor(index / 2);
                [parent] = this.getParent(cell, index);
            }
        });
    }
    deleteMin() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const min = this.getRoot();
            if (!min.node) {
                return [null, null, null];
            }
            const node = min.node;
            const deletedCell = yield this.deleteNodeFromCell(min);
            return [node, min, deletedCell];
        });
    }
    delete(value, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (const cell of this._data) {
                if (!cell.node) {
                    continue;
                }
                const checkingNode = cell.node;
                if (animate) {
                    checkingNode.drawArrow = true;
                    yield new Promise(r => setTimeout(r, 600));
                    checkingNode.drawArrow = false;
                }
                if (checkingNode.value === value) {
                    const deleted = yield this.deleteNodeFromCell(cell);
                    return [checkingNode, cell, deleted];
                }
            }
            return [null, null, null];
        });
    }
    deleteNodeFromCell(cell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!cell.node) {
                return null;
            }
            const lastTakenCell = this.getLastTakenCell();
            if (lastTakenCell === cell) {
                const lastCell = this.getEmptyCell();
                const node = lastTakenCell.removeNode();
                node.setTarget(this.x, this.y - 200);
                this.deleteCell(lastCell);
                return lastCell;
            }
            yield this.swapNodes(cell, lastTakenCell);
            const removed = lastTakenCell.removeNode();
            if (animate) {
                removed.setTarget(this.x, this.y - 200);
                yield new Promise(r => setTimeout(r, 600));
            }
            const emptyCell = this.getEmptyCell();
            this.deleteCell(emptyCell);
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            yield this.downHeap(cell);
        });
    }
    downHeap(cell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            while (!!cell && !!cell.node) {
                const minChild = this.getMinChild(cell);
                if (!minChild) {
                    break;
                }
                const currentNode = cell.node;
                const minNode = minChild.node;
                if (!currentNode || !minNode
                    || minNode.value >= currentNode.value) {
                    break;
                }
                yield this.swapNodes(minChild, cell, animate);
                cell = minChild;
            }
        });
    }
    swapNodes(first, second, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const lowerNode = first.removeNode();
            const higherNode = second.removeNode();
            const oldCellColor = first.color;
            const oldParentColor = second.color;
            if (animate) {
                first.color = '#98dc73';
                second.color = '#98dc73';
                lowerNode.setTarget(second.x - 100, second.y);
                higherNode.setTarget(first.x + 100, first.y);
                yield new Promise(r => setTimeout(r, 600));
                lowerNode.setTarget(second.x, second.y);
                higherNode.setTarget(first.x, first.y);
                yield new Promise(r => setTimeout(r, 300));
            }
            second.setNode(lowerNode);
            first.setNode(higherNode);
            first.color = oldCellColor;
            second.color = oldParentColor;
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
        });
    }
    getMinChild(cell) {
        const leftChild = this.getLeftChild(cell);
        const rightChild = this.getRightChild(cell);
        if ((!leftChild || !leftChild.node)
            && (!rightChild || !rightChild.node)) {
            return null;
        }
        else if ((!leftChild || !leftChild.node) && !!rightChild.node) {
            return rightChild; // technically impossible
        }
        else if ((!rightChild || !rightChild.node) && !!leftChild.node) {
            return leftChild;
        }
        else if (!!leftChild.node && !!rightChild) {
            if (leftChild.node.value < rightChild.node.value) {
                return leftChild;
            }
            else {
                return rightChild;
            }
        }
    }
    deleteCell(cell) {
        const lastCell = this.getEmptyCell();
        if (cell !== lastCell) {
            return;
        }
        this.linkHelper.detachCompletely(cell);
        this.removeCell(this.size--);
    }
    insert(node, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const lastCell = this.getEmptyCell();
            if (animate) {
                node.setTarget(lastCell.x, lastCell.y);
                yield new Promise(r => setTimeout(r, 600));
            }
            yield this.add(node, lastCell, animate);
        });
    }
    getParent(cell, childIndex) {
        if (!cell) {
            return [undefined, undefined];
        }
        if (childIndex) {
            childIndex = this.getTreeIndex(cell);
        }
        const parentIndex = Math.floor(childIndex / 2);
        const side = childIndex % 2;
        const parent = this.getCell(parentIndex);
        return [parent, side];
    }
    getLeftChild(cell, index) {
        if (!cell) {
            return undefined;
        }
        if (!index) {
            index = this.getTreeIndex(cell);
        }
        return this.getCell(2 * index);
    }
    getRightChild(cell, index) {
        if (!cell) {
            return undefined;
        }
        if (!index) {
            index = this.getTreeIndex(cell);
        }
        return this.getCell(2 * index + 1);
    }
    getRoot() {
        return this._data[0];
    }
    setLeftChild(parent, child, parentIndex) {
        if (!parent) {
            return undefined;
        }
        if (!parentIndex) {
            parentIndex = this.getTreeIndex(parent);
        }
        this.setCell(child, 2 * parentIndex);
    }
    setRightChild(parent, child, parentIndex) {
        if (!parent) {
            return undefined;
        }
        if (!parentIndex) {
            parentIndex = this.getTreeIndex(parent);
        }
        this.setCell(child, 2 * parentIndex + 1);
    }
    getTreeIndex(cell) {
        if (!cell) {
            return -1;
        }
        return this._data.findIndex(c => c.id === cell.id) + 1;
    }
    setCell(cell, treeIndex) {
        this._data[treeIndex - 1] = cell;
    }
    getCell(treeIndex) {
        return this._data[treeIndex - 1];
    }
    removeCell(treeIndex) {
        delete this._data[treeIndex - 1];
    }
    getData() {
        return this._data.filter(bcu => !!bcu);
    }
    getEmptyCell() {
        return this.getCell(this.size);
    }
    getLastTakenCell() {
        return this.getCell(this.size - 1);
    }
    detachChildren(cell) {
    }
    detachParent(cell) {
    }
}


/***/ }),

/***/ "bND5":
/*!***********************************************************!*\
  !*** ./src/scenarios/binary-search-tree/scenes/search.ts ***!
  \***********************************************************/
/*! exports provided: Search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return Search; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class Search {
    constructor() {
        this.id = 1;
        this.played = 'not_played';
        this.searchValue = -1;
        this.rootValue = -1;
        this.rightOrLeft = 'left';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(12);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('bst', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
            if (nodes[6] !== this.bst.getRoot().node) {
                this.searchValue = nodes[6].value;
            }
            else {
                this.searchValue = nodes[7].value;
            }
            this.rootValue = this.bst.getRoot().node.value;
            if (this.searchValue < this.rootValue) {
                this.rightOrLeft = 'left';
            }
            else {
                this.rightOrLeft = 'right';
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.find(this.searchValue);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Searching</h1>
  <p>
    Searching in a binary search tree is quite a simple procedure.
  </p>
  <p>
    The algorithm depends on the property of BST that each left
    subtree has values lower than an observed node and each right subtree has values higher than the node.
  </p>
  <p>
    If the value we are looking for is lower than the current node, we can say for sure that the value is not in the right subtree; we
    need to only search in the left subtree and if the value is above the node, we can say for sure that the value is not in the left
    subtree; we need to only search in the right subtree.
  </p>
  <p>
    Let's try to find ${this.searchValue} in the tree.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    When we are searching for the node with value ${this.searchValue} in the binary tree from the right-hand side,
    we will first check the root. The value placed in the root is ${this.rootValue}, so we checked its
    ${this.rightOrLeft} subtree.
  </p>
  <small>
    There is a chance we won't find our desired value, and we will know that it isn't present in the tree
    when we come across a leaf.
  </small>
    `;
    }
}


/***/ }),

/***/ "biAk":
/*!*********************************************************!*\
  !*** ./src/app/view/scene-view/scene-view.component.ts ***!
  \*********************************************************/
/*! exports provided: SceneViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneViewComponent", function() { return SceneViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _core_services_scenario_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/scenario.service */ "Z/hl");
/* harmony import */ var _core_services_scene_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/scene.service */ "1fSV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _content_view_content_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../content-view/content-view.component */ "COz+");
/* harmony import */ var primeng_ripple__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/ripple */ "Q4Mo");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/button */ "jIHw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _visualization_view_visualization_view_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../visualization-view/visualization-view.component */ "l53U");









function SceneViewComponent_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SceneViewComponent_button_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.showNext(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function SceneViewComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SceneViewComponent_ng_template_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.finish(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class SceneViewComponent {
    constructor(scenarioService, sceneService, activatedRoute, router) {
        this.scenarioService = scenarioService;
        this.sceneService = sceneService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.isContentLoading = true;
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(val => {
            this.isContentLoading = true;
            if (!val.path || !val.sceneIndex) {
                this.router.navigate(['']);
            }
            this.scenarioPath = val.path;
            this.sceneIndex = parseInt(val.sceneIndex, 10);
            this.prepareScene();
        });
    }
    prepareScene() {
        const scenario = this.scenarioService.scenarios.find(sc => sc.path === this.scenarioPath);
        if (!!scenario && scenario.scenes.length < 1) {
            this.router.navigate(['']);
        }
        this.scenarioService.currentScenario.next(scenario);
        const sceneClass = this.scenes[this.sceneIndex];
        const scene = new sceneClass();
        scene.isFirst = this.sceneIndex === 0;
        scene.isLast = this.sceneIndex === this.scenes.length - 1;
        this.sceneService.scene.next(scene);
        this.sceneService.played.next(scene.played);
        this.sceneService.set.next(false);
        this.isContentLoading = false;
    }
    showNext() {
        if (this.sceneIndex < this.scenes.length - 1) {
            this.router.navigate([`../${(this.sceneIndex + 1).toString()}`], { relativeTo: this.activatedRoute });
        }
    }
    showPrevious() {
        if (this.sceneIndex > 0) {
            this.router.navigate([`../${(this.sceneIndex - 1).toString()}`], { relativeTo: this.activatedRoute });
        }
    }
    finish() {
        this.router.navigate(['']);
    }
    get scenes() {
        return this.scenarioService.currentScenario.getValue().scenes;
    }
    get scene() {
        return this.sceneService.scene.getValue();
    }
}
SceneViewComponent.ɵfac = function SceneViewComponent_Factory(t) { return new (t || SceneViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_core_services_scenario_service__WEBPACK_IMPORTED_MODULE_1__["ScenarioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_core_services_scene_service__WEBPACK_IMPORTED_MODULE_2__["SceneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
SceneViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SceneViewComponent, selectors: [["app-scene-view"]], decls: 12, vars: 4, consts: [[1, "p-grid", "p-mx-0"], [1, "p-col-12", "p-sm-6", "p-md-4", "p-px-0", "p-pb-0"], [1, "text-part"], [3, "isContentLoading"], [1, "text-footer", "p-ai-center", "p-text-right"], ["icon", "pi pi-angle-left", "label", "Back", "pRipple", "", "pButton", "", 1, "p-button", "p-button-text", "p-button-icon", "p-button-rounded", "p-mr-4", 3, "disabled", "click"], ["class", "p-button p-button-icon p-button-rounded p-mr-4", "icon", "pi pi-angle-double-right", "label", "Next", "pRipple", "", "pButton", "", 3, "click", 4, "ngIf", "ngIfElse"], ["finishButton", ""], [1, "p-col-12", "p-sm-6", "p-md-8", "p-px-0", "p-pb-0"], [1, "visualization-part"], ["icon", "pi pi-angle-double-right", "label", "Next", "pRipple", "", "pButton", "", 1, "p-button", "p-button-icon", "p-button-rounded", "p-mr-4", 3, "click"], ["icon", "pi pi-check", "label", "Finish", "pRipple", "", "pButton", "", 1, "p-button", "p-button-icon", "p-button-rounded", "p-mr-4", 3, "click"]], template: function SceneViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-content-view", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SceneViewComponent_Template_button_click_5_listener() { return ctx.showPrevious(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, SceneViewComponent_button_6_Template, 1, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, SceneViewComponent_ng_template_7_Template, 1, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "app-visualization-view");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("isContentLoading", ctx.isContentLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.scene == null ? null : ctx.scene.isFirst);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(ctx.scene == null ? null : ctx.scene.isLast))("ngIfElse", _r1);
    } }, directives: [_content_view_content_view_component__WEBPACK_IMPORTED_MODULE_4__["ContentViewComponent"], primeng_ripple__WEBPACK_IMPORTED_MODULE_5__["Ripple"], primeng_button__WEBPACK_IMPORTED_MODULE_6__["ButtonDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _visualization_view_visualization_view_component__WEBPACK_IMPORTED_MODULE_8__["VisualizationViewComponent"]], styles: [".text-part[_ngcontent-%COMP%] {\n  align-items: stretch;\n  background-color: #111111;\n  height: 93vh;\n  position: relative;\n  z-index: 0;\n}\n\n.text-footer[_ngcontent-%COMP%] {\n  position: absolute;\n  background-color: #262626;\n  display: flex;\n  justify-content: flex-end;\n  align-content: center;\n  bottom: 0;\n  width: 100%;\n  height: 9vh;\n  z-index: 1000;\n}\n\n.visualization-part[_ngcontent-%COMP%] {\n  align-items: stretch;\n  height: 93vh;\n  position: relative;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lLXZpZXcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFvQjtFQUNwQix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYix5QkFBeUI7RUFDekIscUJBQXFCO0VBQ3JCLFNBQVM7RUFDVCxXQUFXO0VBQ1gsV0FBVztFQUNYLGFBQWE7QUFDZjs7QUFFQTtFQUNFLG9CQUFvQjtFQUNwQixZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCIiwiZmlsZSI6InNjZW5lLXZpZXcuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50ZXh0LXBhcnQge1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExMTExMTtcbiAgaGVpZ2h0OiA5M3ZoO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDA7XG59XG5cbi50ZXh0LWZvb3RlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2MjYyNjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDl2aDtcbiAgei1pbmRleDogMTAwMDtcbn1cblxuLnZpc3VhbGl6YXRpb24tcGFydCB7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBoZWlnaHQ6IDkzdmg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "d8E9":
/*!***************************************************************!*\
  !*** ./src/scenarios/rb-tree/scenes/insertion-second-case.ts ***!
  \***************************************************************/
/*! exports provided: InsertionSecondCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertionSecondCase", function() { return InsertionSecondCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class InsertionSecondCase {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toAdd = 45;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = this.createNodes(simulation, [20, 10, 30, 40]);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('rb', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
        });
    }
    createNodes(simulation, values) {
        const nodes = [];
        for (const value of values) {
            nodes.push(simulation.objectFactory.create('node', 0, 0, value));
        }
        return nodes;
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = simulation.objectFactory.create('node', this.bst.x, this.bst.y - 200, this.toAdd);
            simulation.nodeHandler.add(node);
            yield this.bst.insert(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion - second case</h1>

  <p>
    The second case occurs when new node's uncle is either black or doesn't even exist
    (opposite to the first case), and:
  </p>
  <ul>
    <li>
      New node is the right child of its parent;
    </li>
    <li>
      New node's parent is the right child of its own parent (new node's grandparent).
    </li>
  </ul>
  <p>or symmetrically both are left children of their respective parents.</p>
  <p>
    Now let's see the situation where where all three of nodes will be aligned
    as right children.
  </p>
  <p>
    The new node's parent and grandparent will get left-rotated (or right-rotated if the position were symmetrical)
    and grandparent will become the left child of the new node's parent.
  </p>
  <small>Checking propagates up the tree where new node's parent is checked next</small>
  <p>
    By adding a node with the value ${this.toAdd} to the right-hand side tree,
    it will become unbalanced and that imbalance will be regareded as the second case.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <p>
    Adding ${this.toAdd} has caused imbalance, so nodes with values 30 and 40 got left-rotated, and
    30 become 40's left child, whereas ${this.toAdd} is 40's right child.
  </p>
  <p>
    During the same process, 30 was colored <span style="color: #bb4848;">red</span> and 40
    was colored <span style="color: #868686;">black</span>.
  </p>
  <p>
    Checking was propagated up the tree and since 20 was already colored <span style="color: #868686;">black</span>,
    alhorithm new that balance was restored.
  </p>
    `;
    }
}


/***/ }),

/***/ "dk8d":
/*!********************************!*\
  !*** ./src/app/core/consts.ts ***!
  \********************************/
/*! exports provided: scenariosPath, defaultRadius */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scenariosPath", function() { return scenariosPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultRadius", function() { return defaultRadius; });
const scenariosPath = 'scenarios';
const defaultRadius = 40;


/***/ }),

/***/ "fkI/":
/*!************************************************!*\
  !*** ./src/scenarios/arrays/array-scenario.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/core/simulation/scenario */ "8UQL");
/* harmony import */ var _scenes_start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/start */ "tyHO");
/* harmony import */ var _scenes_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/search */ "vNhy");
/* harmony import */ var _scenes_unsuccessful_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/unsuccessful-search */ "Q1mz");
/* harmony import */ var _scenes_insertion_end__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/insertion-end */ "YOyK");
/* harmony import */ var _scenes_insertion_middle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/insertion-middle */ "I9XJ");
/* harmony import */ var _scenes_insertion_beginning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/insertion-beginning */ "Dgj+");
/* harmony import */ var _scenes_deletion_end__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scenes/deletion-end */ "K24U");
/* harmony import */ var _scenes_deletion_middle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scenes/deletion-middle */ "pUoo");
/* harmony import */ var _scenes_deletion_beginning__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scenes/deletion-beginning */ "I3x1");
/* harmony import */ var _scenes_sorted_search__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./scenes/sorted-search */ "OIvA");











const arrayScenario = new _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__["Scenario"]('Array', 'array', 'Search, insertion, and deletion of elements of an array.');
arrayScenario.cover = 'scenarios/arrays/cover.png';
arrayScenario.scenes = [
    _scenes_start__WEBPACK_IMPORTED_MODULE_1__["StartScene"],
    _scenes_search__WEBPACK_IMPORTED_MODULE_2__["SearchScene"],
    _scenes_unsuccessful_search__WEBPACK_IMPORTED_MODULE_3__["UnsuccessfulSearch"],
    _scenes_insertion_end__WEBPACK_IMPORTED_MODULE_4__["InsertionEnd"],
    _scenes_insertion_middle__WEBPACK_IMPORTED_MODULE_5__["InsertionMiddle"],
    _scenes_insertion_beginning__WEBPACK_IMPORTED_MODULE_6__["InsertionBeginning"],
    _scenes_deletion_end__WEBPACK_IMPORTED_MODULE_7__["DeletionEnd"],
    _scenes_deletion_middle__WEBPACK_IMPORTED_MODULE_8__["DeletionMiddle"],
    _scenes_deletion_beginning__WEBPACK_IMPORTED_MODULE_9__["DeletionBeginning"],
    _scenes_sorted_search__WEBPACK_IMPORTED_MODULE_10__["SortedSearch"]
];
/* harmony default export */ __webpack_exports__["default"] = (arrayScenario);


/***/ }),

/***/ "ftLo":
/*!*********************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/simulation-graph.ts ***!
  \*********************************************************************/
/*! exports provided: SimulationGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationGraph", function() { return SimulationGraph; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _helpers_link_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/link-helper */ "mxwM");


class SimulationGraph {
    constructor(id, x, y) {
        this.z = -1;
        this.isValid = true;
        this.linkHelper = new _helpers_link_helper__WEBPACK_IMPORTED_MODULE_1__["LinkHelper"]();
        this.data = [];
        this.maxId = 0;
        this.id = id;
        this.x = x;
        this.y = y;
    }
    moveCell(cell, xPos, yPos) {
        cell.setTarget(cell.graphX, cell.graphY);
        return;
    }
    add(d, bstCell) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            bstCell.setNode(d);
            d.lockedPlaceholder = bstCell;
        });
    }
    getData() {
        return this.data;
    }
    getLinks() {
        return this.linkHelper.links;
    }
}


/***/ }),

/***/ "ge5I":
/*!**************************************************************!*\
  !*** ./src/scenarios/binary-search-tree/scenes/bst-scene.ts ***!
  \**************************************************************/
/*! exports provided: BstScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BstScene", function() { return BstScene; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class BstScene {
    constructor() {
        this.id = 0;
        this.played = 'unplayable';
        this.rootValue = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            const bst = simulation.objectFactory.create('bst', 0, 0);
            simulation.bstHandler.add(bst);
            for (const node of nodes) {
                yield bst.insert(node, false);
            }
            this.rootValue = bst.getRoot().node.value;
        });
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Binary search tree</h1>
  <p>
    Binary search tree is a <a href="/visualize/heap">binary tree</a> which has the following properties:
  </p>
  <ul>
    <li>
       Every descendant of a node starting from its <em>left</em> child, i.e. every node in the left subtree
       has a lower value than that of the given node;
    </li>
    <li>
       Every descendant of a node starting from its <em>right</em> child, i.e. every node in the right subtree
       has a higher value than that of the given node;
    </li>
    <li>
        Aforementioned properties apply for every single node of a binary search tree.
    </li>
  </ul>
  <p>
    Looking at the right-hand side, root of the tree has a value of ${this.rootValue}, and
    every node starting from its left child has a lower value, whereas every node
    from the right subtree has a higher value.
  </p>
  <p>
    Let's see how binary search tree makes searching more efficient!
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "gxGK":
/*!*************************************************************!*\
  !*** ./src/scenarios/rb-tree/scenes/deletion-first-case.ts ***!
  \*************************************************************/
/*! exports provided: DeletionFirstCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionFirstCase", function() { return DeletionFirstCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionFirstCase {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toDelete = 40;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = this.createNodes(simulation, [30, 10, 40, 20]);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('rb', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
        });
    }
    createNodes(simulation, values) {
        const nodes = [];
        for (const value of values) {
            nodes.push(simulation.objectFactory.create('node', 0, 0, value));
        }
        return nodes;
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.delete(this.toDelete);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion - first case</h1>

  <p>
    Deletion of a node from a red-black tree is quite similar to that of an ordinary
    binary search tree, with the exception that, if a black node is deleted, black depth
    property is violated and balance has to be restored.
  </p>
  <p>
    If the deleted node was colored black, then its sibling's subtree is checked, and thus
    three different cases are formed.
  </p>
  <p>
    The first case occurs when the deleted node's sibling is black and has a red child. In that
    situation, tri-node-restructuring is performed.
  </p>
  <p>
    After removing ${this.toDelete} from the tree on the right-hand side, the first case will occur.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <small>
    Checking wasn't propagated up the tree.
  </small>
    `;
    }
}


/***/ }),

/***/ "gzon":
/*!**************************************************************!*\
  !*** ./src/scenarios/rb-tree/scenes/insertion-third-case.ts ***!
  \**************************************************************/
/*! exports provided: InsertionThirdCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertionThirdCase", function() { return InsertionThirdCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class InsertionThirdCase {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toAdd = 35;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = this.createNodes(simulation, [20, 10, 30, 40]);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('rb', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
        });
    }
    createNodes(simulation, values) {
        const nodes = [];
        for (const value of values) {
            nodes.push(simulation.objectFactory.create('node', 0, 0, value));
        }
        return nodes;
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = simulation.objectFactory.create('node', this.bst.x, this.bst.y - 200, this.toAdd);
            simulation.nodeHandler.add(node);
            yield this.bst.insert(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Insertion - third case</h1>

  <p>
    The thid case occurs when new node's uncle is either black or doesn't even exist
    (opposite to the first case), and:
  </p>
  <ul>
    <li>
      New node is the left child of its parent;
    </li>
    <li>
      New node's parent is the right child of its own parent (new node's grandparent).
    </li>
  </ul>
  <p>or symmetrically new node is the right child and its parent is the left child of their respective parents.</p>
  <p>
    Now let's see the situation where new node is right, and its parent is the left child.
  </p>
  <p>
    Firstly, there will be right-rotation (or left-rotation if the position were symmetrical)
    of the new node and its parent. Therefore, the position from the second case is formed,
    and those same operations that occurred in the second case can be performed.
  </p>
  <p>
    The new node's parent and grandparent will get left-rotated (or right-rotated if the position were symmetrical)
    and grandparent will become the left child of the new node's parent.
  </p>
  <small>Checking propagates up the tree where new node's parent is checked next</small>
  <p>
    By adding a node with the value ${this.toAdd} to the right-hand side tree,
    it will become unbalanced and that imbalance will be regareded as the third case.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <p>
    Adding ${this.toAdd} has caused imbalance, so that new node with value ${this.toAdd} and the node with value 40 got rotated,
    after which the node ${this.toAdd} and 30 rotated left.
  </p>
  <p>
    During the same process, 30 was colored <span style="color: #bb4848;">red</span> and ${this.toAdd}
    was colored <span style="color: #868686;">black</span>.
  </p>
  <p>
    Checking was propagated up the tree and since 20 was already colored <span style="color: #868686;">black</span>,
    alhorithm new that balance was restored.
  </p>
    `;
    }
}


/***/ }),

/***/ "h0Z1":
/*!************************************************!*\
  !*** ./src/scenarios/heap/scenes/insertion.ts ***!
  \************************************************/
/*! exports provided: Insertion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Insertion", function() { return Insertion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class Insertion {
    constructor() {
        this.id = 3;
        this.played = 'not_played';
        this.newElement = -9.31;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.heap = simulation.objectFactory.create('heap', 0, 0);
            simulation.heapHandler.add(this.heap);
            for (const node of nodes) {
                yield this.heap.insert(node, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.newElement, -1, this.heap.x, this.heap.y - 200);
            simulation.nodeHandler.add(node);
            yield this.heap.insert(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Heap insertion</h1>
  <p>
    Inserting an element to a heap is done by simply inserting a
    node as its last leaf and then propagating it up the heap
    in order to find its correct position.
  </p>
  <ul>
    <li>
      Insert new node ${this.newElement} to the heap's last leaf;
    </li>
    <li>
      Swap the node contatining ${this.newElement} and its parent as long as
      the node's value is lower than its parent's value.
    </li>
  </ul>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.newElement} is now inserted and the heap order is restored.
  </p>
    `;
    }
}


/***/ }),

/***/ "hB21":
/*!*************************************************!*\
  !*** ./src/app/view/navbar/navbar.component.ts ***!
  \*************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/button */ "jIHw");



class NavbarComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    toHomePage() {
        this.router.navigate(['']);
    }
}
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
NavbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], decls: 6, vars: 0, consts: [[1, "navbar", "p-d-flex"], [1, "title", 3, "click"], [1, "p-text-bold", "p-ml-5"], [1, "buttons", "p-ml-auto", "p-mr-4"], ["label", "About", "pButton", "", 1, "p-button-text"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_Template_div_click_1_listener() { return ctx.toHomePage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "alharismi");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [primeng_button__WEBPACK_IMPORTED_MODULE_2__["ButtonDirective"]], styles: [".navbar[_ngcontent-%COMP%] {\n  background-color: #1e1e1e;\n  height: 7vh;\n  align-items: center;\n}\n\n.title[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #ffffff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsY0FBYztBQUNoQiIsImZpbGUiOiJuYXZiYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXZiYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWUxZTFlO1xuICBoZWlnaHQ6IDd2aDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnRpdGxlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "hdS/":
/*!****************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/bst-drawing.ts ***!
  \****************************************************************/
/*! exports provided: BstDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BstDrawing", function() { return BstDrawing; });
class BstDrawing {
    enter(enterElement) {
        const treeElement = enterElement.append('g')
            .attr('class', 'bst');
        return treeElement;
    }
    update(updateElement) {
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
}


/***/ }),

/***/ "hvE2":
/*!*****************************************************!*\
  !*** ./src/scenarios/stack-queue/scenes/enqueue.ts ***!
  \*****************************************************/
/*! exports provided: Enqueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Enqueue", function() { return Enqueue; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class Enqueue {
    constructor() {
        this.id = 4;
        this.played = 'not_played';
        this.elements = '';
        this.queueSize = -1;
        this.firstValue = -1;
        this.lastValue = -1;
        this.toEnqueue = 23.11;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.queue = simulation.objectFactory.create('queue', 0, 0, 10);
            simulation.arrayHandler.add(this.queue);
            for (const node of nodes) {
                yield this.queue.enqueue(node, false);
            }
            this.firstValue = this.queue.left.node.value;
            this.lastValue = this.queue.right.node.value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.toEnqueue, -1, this.queue.x, this.queue.y - 200);
            simulation.nodeHandler.add(node);
            yield this.queue.enqueue(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Queue - Enqueue operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's the queue implementation.
  </p>
  <p>
    The first element of the queue is <span style="color: #a0ff6f; font-weight: bold">${this.firstValue}</span>,
    and the last element is <span style="color: #ff9494; font-weight: bold">${this.lastValue}</span>.
  </p>
  <p>
    The operation that will be performed now is the <em>enqueue</em> operation.
  </p>
  <p>
    In this configuration, enqueue is done as simple insertion at the end of the implementation array.
  </p>
  <p>
    Let's see how ${this.toEnqueue} is enqueued to this queue.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    After successfully enqueueing the value ${this.toEnqueue}, it has became the new last element.
  </p>
  <small>More details about enqueue operation will be covered in the section following dequeue.</small>
    `;
    }
}


/***/ }),

/***/ "iIX3":
/*!*******************************************************!*\
  !*** ./src/scenarios/linked-list/scenes/insertion.ts ***!
  \*******************************************************/
/*! exports provided: Insertion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Insertion", function() { return Insertion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class Insertion {
    constructor() {
        this.id = 3;
        this.played = 'not_played';
        this.insertionIndex = -1;
        this.newElement = 23.11;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0);
            simulation.linkedListHandler.add(this.list);
            for (const node of nodes) {
                yield this.list.append(node, false);
            }
            this.insertionIndex = Math.floor(nodes.length / 2);
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.newElement, -1, this.list.x, this.list.y - 200);
            simulation.nodeHandler.add(node);
            yield this.list.insert(node, this.insertionIndex);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linked list - insertion after a given index</h1>
  <p>
    Inserting an element to a linked list wouldn't be too complicated if
    there were an easy way to find out where that index is.
  </p>
  <p>
    That being said, finding an element at a given index has to be performed by
    traversing successors and counting how many nodes were passed at every
    given iteration.
  </p>
  <p>
    After finding an element at a given index, insertion consists of a few steps which involve the
    predecessor and the successor of the new node:
  </p>
  <ul>
    <li>
      New predecessor now references the new node.
    </li>
    <li>
      The new node now references the new successor.
    </li>
  </ul>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.newElement} is now inserted after the index ${this.insertionIndex} of the linked list.
  </p>
    `;
    }
}


/***/ }),

/***/ "kZ6W":
/*!********************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/linked-list-mouse.ts ***!
  \********************************************************************/
/*! exports provided: LinkedListMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedListMouse", function() { return LinkedListMouse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-context-menu */ "Ttfg");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(d3_context_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basics/simulation-node */ "Q48m");



class LinkedListMouse {
    constructor(simulation) {
        this.simulation = simulation;
    }
    contextMenu(d, i, trees) {
        const menu = [
            {
                title: 'Prepend',
                disabled: !d.isValid,
                action: (linkedList) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = parseFloat(yield this.simulation.prompt('Which value to prepend'));
                    if (isNaN(newValue)) {
                        alert('Value invalid');
                        return;
                    }
                    const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__["SimulationNode"](newValue, -1, linkedList.x, linkedList.y - 150);
                    this.simulation.nodeHandler.add(node);
                    yield linkedList.prepend(node);
                })
            },
            {
                title: 'Append',
                disabled: !d.isValid,
                action: (linkedList) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = parseFloat(yield this.simulation.prompt('Which value to append'));
                    if (isNaN(newValue)) {
                        alert('Value invalid');
                        return;
                    }
                    const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__["SimulationNode"](newValue, -1, linkedList.x, linkedList.y - 150);
                    this.simulation.nodeHandler.add(node);
                    yield linkedList.append(node);
                })
            },
            {
                title: 'Insert',
                disabled: !d.isValid,
                action: (linkedList) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = parseFloat(yield this.simulation.prompt('Which value to insert'));
                    const index = parseFloat(yield this.simulation.prompt('At which index to insert?'));
                    if (isNaN(newValue) || isNaN(index)) {
                        alert('Value invalid');
                        return;
                    }
                    const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__["SimulationNode"](newValue, -1, linkedList.x, linkedList.y - 150);
                    this.simulation.nodeHandler.add(node);
                    yield linkedList.insert(node, index);
                })
            },
            {
                divider: true
            },
            {
                title: 'Pop first',
                disabled: d.getData().length <= 2,
                action: (linkedList) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield linkedList.popFirst();
                })
            },
            {
                title: 'Pop last',
                disabled: d.getData().length <= 2,
                action: (linkedList) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield linkedList.popLast();
                })
            },
            {
                title: 'Delete',
                disabled: d.getData().length <= 2,
                action: (linkedList) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const index = parseFloat(yield this.simulation.prompt('From which index to delete'));
                    if (isNaN(index)) {
                        alert('Value invalid');
                        return;
                    }
                    yield linkedList.delete(index);
                })
            },
            {
                title: 'Info log',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    console.log(elm);
                })
            }
        ];
        d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default()(menu)(d, i);
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element
            // .on('mouseover', (d: LinkedList, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
            // .on('mouseout', (d: LinkedList, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
            .on('contextmenu', ((d, i, trees) => this.contextMenu(d, i, trees)));
        return element;
    }
}


/***/ }),

/***/ "l53U":
/*!*************************************************************************!*\
  !*** ./src/app/view/visualization-view/visualization-view.component.ts ***!
  \*************************************************************************/
/*! exports provided: VisualizationViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizationViewComponent", function() { return VisualizationViewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _core_simulation_helpers_arrowhead_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/simulation/helpers/arrowhead-helper */ "H8PZ");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _prompt_prompt_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prompt/prompt.component */ "1yNI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _core_services_scenario_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/services/scenario.service */ "Z/hl");
/* harmony import */ var _core_services_scene_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/services/scene.service */ "1fSV");
/* harmony import */ var _core_services_playground_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/services/playground.service */ "sqDJ");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/api */ "7zfz");
/* harmony import */ var primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/dynamicdialog */ "J7/z");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var primeng_ripple__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/ripple */ "Q4Mo");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/button */ "jIHw");
/* harmony import */ var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/overlaypanel */ "z8Lm");
/* harmony import */ var primeng_skeleton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/skeleton */ "jeV5");
/* harmony import */ var primeng_inputnumber__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/inputnumber */ "Ks7X");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var primeng_slider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/slider */ "+la4");




















const _c0 = ["canvas"];
const _c1 = ["skeleton"];
const _c2 = function () { return { width: "100%", height: "100%" }; };
function VisualizationViewComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", null, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "p-skeleton", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](2, _c2));
} }
function VisualizationViewComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p-inputNumber", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function VisualizationViewComponent_ng_template_11_Template_p_inputNumber_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r5.speed = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "p-slider", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function VisualizationViewComponent_ng_template_11_Template_p_slider_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r7.speed = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("min", 0.5)("max", 3)("minFractionDigits", 1)("maxFractionDigits", 1)("ngModel", ctx_r3.speed);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("min", 0.5)("max", 3)("step", 0.1)("ngModel", ctx_r3.speed);
} }
const _c3 = function (a1) { return { width: "100%", height: a1 }; };
class VisualizationViewComponent {
    constructor(router, scenarioService, sceneService, playgroundService, messageService, dialogService) {
        this.router = router;
        this.scenarioService = scenarioService;
        this.sceneService = sceneService;
        this.playgroundService = playgroundService;
        this.messageService = messageService;
        this.dialogService = dialogService;
        this._speed = 1;
        this.isVisualizationLoading = true;
        this.widthHeight = [0, 0];
    }
    ngAfterViewInit() {
        setTimeout(() => this.init(), 600);
    }
    init() {
        this.widthHeight = [this.skeletonElement.nativeElement.offsetWidth, this.skeletonElement.nativeElement.offsetHeight - 10];
        this.setupSvg();
        const g = this.svg
            .append('g')
            .attr('class', 'canvas');
        this.scenarioService.initSimulation(g, this.widthHeight, this.promptString(this.dialogService));
        this.scenarioService.startSimulation(this.svg);
        this.scenarioService.simulation.camera.focusSvg();
        this.scenarioService.simulation.interactable = false;
        this.readScene();
    }
    openInPlayground() {
        this.router.navigate(['playground']);
    }
    setupSvg() {
        this.svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.canvasElement.nativeElement).append('svg')
            .attr('id', 'svgCanvas')
            .attr('height', this.widthHeight[1])
            .attr('width', this.widthHeight[0])
            .style('background', '#282828');
        _core_simulation_helpers_arrowhead_helper__WEBPACK_IMPORTED_MODULE_2__["ArrowheadHelper"].addArrowhead(this.svg);
        this.svg.append('filter')
            .attr('id', 'blur')
            .append('feGaussianBlur')
            .attr('stdDeviation', 5);
    }
    play() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.scene.played = 'playing';
            try {
                yield this.scene.play(this.scenarioService.simulation);
            }
            catch (e) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: e });
                console.log(e);
            }
            this.scene.played = 'played';
            this.sceneService.played.next('played');
        });
    }
    readScene() {
        this.sceneService.scene.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(50)).subscribe((sc) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isVisualizationLoading = true;
            yield this.setScene(sc);
            this.isVisualizationLoading = false;
        }));
    }
    setScene(sc) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.scenarioService.simulation.reset();
            yield sc.setup(this.scenarioService.simulation);
            this.sceneService.set.next(true);
        });
    }
    resetScene() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.setScene(this.scene);
            this.scene.played = 'not_played';
            this.sceneService.played.next('not_played');
        });
    }
    onResize() {
        if (!this.isVisualizationLoading) {
            this.widthHeight = [this.canvasElement.nativeElement.offsetWidth, this.canvasElement.nativeElement.offsetHeight - 10];
        }
        else {
            this.widthHeight = [this.skeletonElement.nativeElement.offsetWidth, this.skeletonElement.nativeElement.offsetHeight - 10];
        }
        d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#svgCanvas')
            .attr('height', this.widthHeight[1])
            .attr('width', this.widthHeight[0]);
        this.scenarioService.updateWidthHeight(this.widthHeight);
    }
    promptString(dialogService) {
        return (header) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const ref = dialogService.open(_prompt_prompt_component__WEBPACK_IMPORTED_MODULE_4__["PromptComponent"], {
                header,
                baseZIndex: 1000,
                width: '50%'
            });
            return yield ref.onClose.toPromise();
        });
    }
    get speed() {
        return this._speed;
    }
    set speed(val) {
        this._speed = val;
    }
    get scene() {
        return this.sceneService.scene.getValue();
    }
}
VisualizationViewComponent.ɵfac = function VisualizationViewComponent_Factory(t) { return new (t || VisualizationViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_scenario_service__WEBPACK_IMPORTED_MODULE_7__["ScenarioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_scene_service__WEBPACK_IMPORTED_MODULE_8__["SceneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_playground_service__WEBPACK_IMPORTED_MODULE_9__["PlaygroundService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](primeng_api__WEBPACK_IMPORTED_MODULE_10__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](primeng_dynamicdialog__WEBPACK_IMPORTED_MODULE_11__["DialogService"])); };
VisualizationViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: VisualizationViewComponent, selectors: [["app-visualization-view"]], viewQuery: function VisualizationViewComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.canvasElement = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.skeletonElement = _t.first);
    } }, hostBindings: function VisualizationViewComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("resize", function VisualizationViewComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresolveWindow"]);
    } }, decls: 13, vars: 8, consts: [[1, "visualization-content"], ["canvas", ""], [3, "style", 4, "ngIf"], [1, "visualization-footer"], [1, "p-d-flex", "p-flex-row"], [1, "p-buttonset"], ["icon", "pi pi-play", "label", "Play", "pRipple", "", "pButton", "", 1, "p-button", "p-button-info", "p-button-icon", "p-button-rounded", 3, "disabled", "click"], ["icon", "pi pi-clock", "label", "Speed", "pRipple", "", "pButton", "", 1, "p-button", "p-button-info", "p-button-icon", "p-button-rounded", 3, "click"], ["icon", "pi pi-refresh", "label", "Reset", "pRipple", "", "pButton", "", 1, "p-button", "p-button-info", "p-button-icon", "p-button-rounded", 3, "disabled", "click"], ["appendTo", "body", 3, "showCloseIcon"], ["op", ""], ["pTemplate", ""], ["label", "OPEN IN PLAYGROUND", "icon", "pi pi-external-link", "pRipple", "", "pButton", "", 1, "p-button", "p-button-sm", "p-button-text", "p-button-secondary", "visualize-button", 3, "click"], ["skeleton", ""], ["width", "100%", "height", "100%"], ["mode", "decimal", 3, "min", "max", "minFractionDigits", "maxFractionDigits", "ngModel", "ngModelChange"], [3, "min", "max", "step", "ngModel", "ngModelChange"]], template: function VisualizationViewComponent_Template(rf, ctx) { if (rf & 1) {
        const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, VisualizationViewComponent_div_2_Template, 3, 3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function VisualizationViewComponent_Template_button_click_6_listener() { return ctx.play(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function VisualizationViewComponent_Template_button_click_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](10); return _r2.toggle($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function VisualizationViewComponent_Template_button_click_8_listener() { return ctx.resetScene(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "p-overlayPanel", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, VisualizationViewComponent_ng_template_11_Template, 2, 9, "ng-template", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function VisualizationViewComponent_Template_button_click_12_listener() { return ctx.openInPlayground(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](6, _c3, ctx.isVisualizationLoading ? 0 : "100%"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isVisualizationLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.scene.played !== "not_played");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.scene.played !== "played");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("showCloseIcon", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_12__["NgIf"], primeng_ripple__WEBPACK_IMPORTED_MODULE_13__["Ripple"], primeng_button__WEBPACK_IMPORTED_MODULE_14__["ButtonDirective"], primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_15__["OverlayPanel"], primeng_api__WEBPACK_IMPORTED_MODULE_10__["PrimeTemplate"], primeng_skeleton__WEBPACK_IMPORTED_MODULE_16__["Skeleton"], primeng_inputnumber__WEBPACK_IMPORTED_MODULE_17__["InputNumber"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgModel"], primeng_slider__WEBPACK_IMPORTED_MODULE_19__["Slider"]], styles: [".visualization-content[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.visualization-footer[_ngcontent-%COMP%] {\n  position: absolute;\n  padding-top: 1rem;\n  background-color: #2f2f2f;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  bottom: 0;\n  width: 100%;\n  height: auto;\n}\n\n.visualize-button[_ngcontent-%COMP%] {\n  font-size: .7rem;\n  font-weight: 500;\n  margin: 2px;\n  padding: 2px;\n}\n\n  .canvas {\n  font-family: 'Courier New', sans-serif;\n  font-weight: 500;\n}\n\n  .canvas text {\n  -webkit-user-select: none;\n          user-select: none;\n  pointer-events: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpc3VhbGl6YXRpb24tdmlldy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qiw2QkFBNkI7RUFDN0IsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0Usc0NBQXNDO0VBQ3RDLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHlCQUFpQjtVQUFqQixpQkFBaUI7RUFDakIsb0JBQW9CO0FBQ3RCIiwiZmlsZSI6InZpc3VhbGl6YXRpb24tdmlldy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZpc3VhbGl6YXRpb24tY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnZpc3VhbGl6YXRpb24tZm9vdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJmMmYyZjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvdHRvbTogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLnZpc3VhbGl6ZS1idXR0b24ge1xuICBmb250LXNpemU6IC43cmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICBtYXJnaW46IDJweDtcbiAgcGFkZGluZzogMnB4O1xufVxuXG46Om5nLWRlZXAgLmNhbnZhcyB7XG4gIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG46Om5nLWRlZXAgLmNhbnZhcyB0ZXh0IHtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuIl19 */"] });


/***/ }),

/***/ "lKEG":
/*!********************************************!*\
  !*** ./src/scenarios/sort/scenes/merge.ts ***!
  \********************************************/
/*! exports provided: Merge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Merge", function() { return Merge; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_structures_array_merge_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/structures/array/merge-sort */ "m05m");


class Merge {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.array.sorting = new _app_core_simulation_structures_array_merge_sort__WEBPACK_IMPORTED_MODULE_1__["MergeSort"]();
            yield this.array.sort();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Merge sort</h1>
  <p>
    Merge Sort is one of the most popular sorting algorithms that is based on the
    principle of Divide and Conquer Algorithm.
  </p>
  <p>
    Here, a problem is divided into multiple sub-problems. Each sub-problem is solved
    individually. Finally, sub-problems are combined to form the final solution.
  </p>
  <p>
    Using the Divide and Conquer technique, we divide a problem into subproblems.
    When the solution to each subproblem is ready, we 'combine' the results from the
    subproblems to solve the main problem.
  </p>

  <p>
    Suppose we had to sort an array <em>A</em>. A subproblem would be to sort a sub-section of
    this array starting at index <em>p</em> and ending at index <em>r</em>, denoted as <em>A[p..r]</em>.
  </p>

  <p>
    If <em>q</em> is the half-way point between <em>p</em> and <em>r</em>, then we can split the subarray <em>A[p..r]</em> into two
    arrays <em>A[p..q]</em> and <em>A[q+1, r]</em>.
  </p>
  <p>
    In the conquer step, we try to sort both the subarrays <em>A[p..q]</em> and <em>A[q+1, r]</em>. If we haven't yet reached the base case,
    we again divide both these subarrays and try to sort them.
  </p>
  <p>
    When the conquer step reaches the base step and we get two sorted subarrays <em>A[p..q]</em>
    and <em>A[q+1, r]</em> for array <em>A[p..r]</em>, we combine the results by creating
    a sorted array <em>A[p..r]</em> from two sorted subarrays <em>A[p..q]</em> and <em>A[q+1, r]</em>.
  </p>
  <p>
    Press play to sort the elements
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    In sorting n objects, merge sort has an average and worst-case performance of <em>O(n log n)</em>.
  </p>
    `;
    }
}


/***/ }),

/***/ "lMj5":
/*!****************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/array-cell.ts ***!
  \****************************************************************/
/*! exports provided: ArrayCell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayCell", function() { return ArrayCell; });
class ArrayCell {
    constructor(parent, x, y, width, height, id) {
        this.isMouseOver = false;
        this.defaultColor = '#E2E8CE';
        this.color = '#E2E8CE';
        this.rx = 25;
        this.ry = 25;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    }
    addNode(node) {
        this.node = node;
        this.hoveringNode = node;
        node.lockedGrid = this;
        node.hoveringGrid = this;
        node.fx = this.parent.x + this.x + this.width / 2;
        node.fy = this.height / 2 + this.parent.y;
        node.pointerEvents = true;
        node.noCollision = true;
        node.nodeOrder = 2;
        node.x = this.parent.x + this.x + this.width / 2;
        node.y = this.height / 2 + this.parent.y;
        this.parent.sorted = false;
        this.parent.size++;
    }
    removeNode() {
        if (!this.node) {
            return null;
        }
        const node = this.node;
        node.lockedGrid = undefined;
        node.hoveringGrid = undefined;
        this.node = undefined;
        this.hoveringNode = undefined;
        node.fx = undefined;
        node.fy = undefined;
        node.nodeOrder = 1;
        node.noCollision = false;
        this.parent.sorted = false;
        this.parent.size--;
        return node;
    }
    toString() {
        return `[${this.id}]`;
    }
    setDefaultColor(color) {
        this.defaultColor = color;
    }
    highlight(color) {
        this.color = color;
    }
    resetColor() {
        this.color = this.defaultColor;
        return this.color;
    }
    get absoluteX() {
        return this.parent.x + this.x + this.width / 2;
    }
    get absoluteY() {
        return this.parent.y + this.y + this.height / 2;
    }
}


/***/ }),

/***/ "lS7s":
/*!************************************!*\
  !*** ./src/scenarios/scenarios.ts ***!
  \************************************/
/*! exports provided: scenarios */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scenarios", function() { return scenarios; });
/* harmony import */ var _arrays_array_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays/array-scenario */ "fkI/");
/* harmony import */ var _stack_queue_stack_queue_scenario__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stack-queue/stack-queue-scenario */ "yesG");
/* harmony import */ var _linked_list_linked_list_scenario__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linked-list/linked-list-scenario */ "N/sd");
/* harmony import */ var _heap_heap_scenario__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./heap/heap-scenario */ "wegX");
/* harmony import */ var _binary_search_tree_bst_scenario__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./binary-search-tree/bst-scenario */ "8YQ4");
/* harmony import */ var _rb_tree_rb_scenario__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rb-tree/rb-scenario */ "HzMd");
/* harmony import */ var _sort_sort_scenario__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sort/sort-scenario */ "A0pT");







const scenarios = [
    _arrays_array_scenario__WEBPACK_IMPORTED_MODULE_0__["default"],
    _linked_list_linked_list_scenario__WEBPACK_IMPORTED_MODULE_2__["default"],
    _stack_queue_stack_queue_scenario__WEBPACK_IMPORTED_MODULE_1__["default"],
    _sort_sort_scenario__WEBPACK_IMPORTED_MODULE_6__["default"],
    _heap_heap_scenario__WEBPACK_IMPORTED_MODULE_3__["default"],
    _binary_search_tree_bst_scenario__WEBPACK_IMPORTED_MODULE_4__["default"],
    _rb_tree_rb_scenario__WEBPACK_IMPORTED_MODULE_5__["default"]
];


/***/ }),

/***/ "lzel":
/*!************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/bst-mouse.ts ***!
  \************************************************************/
/*! exports provided: BstMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BstMouse", function() { return BstMouse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-context-menu */ "Ttfg");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(d3_context_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basics/simulation-node */ "Q48m");



class BstMouse {
    constructor(simulation) {
        this.simulation = simulation;
    }
    contextMenu(d, i, trees) {
        const menu = [
            {
                title: 'Change name',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    elm.getRoot().setDefaultDescriptor(yield this.simulation.prompt('New name'));
                })
            },
            {
                // divider
                divider: true
            },
            {
                title: 'Find',
                disabled: !d.isValid,
                action: (bst) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = yield this.simulation.prompt('Which value to find');
                    const parsed = parseFloat(newValue);
                    if (isNaN(parsed)) {
                        alert('Value invalid');
                        return;
                    }
                    yield bst.find(parsed);
                })
            },
            {
                title: 'Insert',
                disabled: !d.isValid,
                action: (bst) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = parseFloat(yield this.simulation.prompt('Which value to insert'));
                    if (isNaN(newValue)) {
                        alert('Value invalid');
                        return;
                    }
                    const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__["SimulationNode"](newValue, -1, bst.x, bst.y - 150);
                    this.simulation.nodeHandler.add(node);
                    yield bst.insert(node);
                })
            },
            {
                title: 'Delete',
                disabled: !d.isValid,
                action: (bst) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const deleteValue = parseFloat(yield this.simulation.prompt('Which value to delete'));
                    if (isNaN(deleteValue)) {
                        alert('Value invalid');
                        return;
                    }
                    yield bst.delete(deleteValue);
                })
            },
            {
                title: 'Info log',
                action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    console.log(elm);
                })
            }
        ];
        if (!d.isValid) {
            menu.push({
                divider: true
            }, {
                title: 'Fix tree',
                action: (bst) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield bst.fix();
                })
            });
        }
        d3_context_menu__WEBPACK_IMPORTED_MODULE_1___default()(menu)(d, i);
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element
            // .on('mouseover', (d: BinarySearchTree, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, arrays))
            // .on('mouseout', (d: BinarySearchTree, i: number, arrays: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, arrays))
            .on('contextmenu', ((d, i, trees) => this.contextMenu(d, i, trees)));
        return element;
    }
}


/***/ }),

/***/ "m05m":
/*!****************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/merge-sort.ts ***!
  \****************************************************************/
/*! exports provided: MergeSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSort", function() { return MergeSort; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class MergeSort {
    sort(arr) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.mergeSort(arr, arr.data.slice(0, arr.size));
        });
    }
    mergeSort(arr, data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (data.length > 1) {
                const mid = Math.floor(data.length / 2);
                data.forEach(c => c.highlight('#fd8b28'));
                yield new Promise(r => setTimeout(r, 1200));
                data.forEach(c => c.resetColor());
                yield new Promise(r => setTimeout(r, 600));
                const left = data.slice(0, mid);
                const right = data.slice(mid);
                yield this.mergeSort(arr, left);
                yield this.mergeSort(arr, right);
                let i = 0;
                let j = 0;
                let k = 0;
                left.forEach(c => c.highlight('#fde828'));
                // left.forEach(c => c.resetColor());
                right.forEach(c => c.highlight('#ff5858'));
                // await new Promise(r => setTimeout(r, 1200));
                // right.forEach(c => c.resetColor());
                const leftNodes = left.map(lCell => {
                    const node = lCell.removeNode();
                    node.setTarget(lCell.absoluteX - 50, lCell.absoluteY + 100);
                    return node;
                });
                const rightNodes = right.map(rCell => {
                    const node = rCell.removeNode();
                    node.setTarget(rCell.absoluteX + 50, rCell.absoluteY + 100);
                    return node;
                });
                yield new Promise(r => setTimeout(r, 1200));
                while (i < leftNodes.length && j < rightNodes.length) {
                    if (leftNodes[i].value < rightNodes[j].value) {
                        leftNodes[i].setTarget(data[k].absoluteX, data[k].absoluteY);
                        data[k].highlight('#98dc73');
                        yield new Promise(r => setTimeout(r, 1200));
                        data[k].addNode(leftNodes[i]);
                        ++i;
                    }
                    else {
                        rightNodes[j].setTarget(data[k].absoluteX, data[k].absoluteY);
                        data[k].highlight('#98dc73');
                        yield new Promise(r => setTimeout(r, 1200));
                        data[k].addNode(rightNodes[j]);
                        ++j;
                    }
                    ++k;
                }
                while (i < left.length) {
                    leftNodes[i].setTarget(data[k].absoluteX, data[k].absoluteY);
                    data[k].highlight('#98dc73');
                    yield new Promise(r => setTimeout(r, 1200));
                    data[k].addNode(leftNodes[i]);
                    ++i;
                    ++k;
                }
                while (j < right.length) {
                    rightNodes[j].setTarget(data[k].absoluteX, data[k].absoluteY);
                    data[k].highlight('#98dc73');
                    yield new Promise(r => setTimeout(r, 1200));
                    data[k].addNode(rightNodes[j]);
                    ++j;
                    ++k;
                }
            }
        });
    }
}


/***/ }),

/***/ "msOR":
/*!****************************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/linked-list/linked-list.ts ***!
  \****************************************************************************/
/*! exports provided: LinkedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedList", function() { return LinkedList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _simulation_graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../simulation-graph */ "ftLo");
/* harmony import */ var _bst_cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bst-cell */ "r+2I");



class LinkedList extends _simulation_graph__WEBPACK_IMPORTED_MODULE_1__["SimulationGraph"] {
    constructor(id, x, y, double = false) {
        super(id, x, y);
        this.linkDistance = 150;
        this.pointers = {};
        this.double = double;
    }
    init() {
        const head = new _bst_cell__WEBPACK_IMPORTED_MODULE_2__["BstCell"](this, -1, this.x, this.y, 'Head');
        head.isRoot = true;
        this.addCell(head, null);
        const tail = new _bst_cell__WEBPACK_IMPORTED_MODULE_2__["BstCell"](this, -2, this.x, this.y, 'Tail');
        this.addCell(tail, head);
    }
    addCell(cell, predecessor) {
        this.data.push(cell);
        this.pointers[cell.id] = { next: undefined, prev: undefined };
        if (predecessor) {
            const successor = this.getSuccessor(predecessor);
            this.pointers[predecessor.id].next = cell.id;
            if (successor) {
                this.pointers[cell.id].next = successor.id;
                this.linkHelper.removeLink(predecessor, successor);
                this.linkHelper.addLink(cell, successor, this.double ? -20 : 0);
            }
            this.linkHelper.addLink(predecessor, cell, this.double ? -20 : 0);
            if (this.double) {
                this.pointers[cell.id].prev = predecessor.id;
                if (successor) {
                    this.pointers[successor.id].prev = cell.id;
                    this.linkHelper.removeLink(successor, predecessor);
                    this.linkHelper.addLink(successor, cell, 20);
                }
                this.linkHelper.addLink(cell, predecessor, 20);
            }
            else if (successor && successor.id === -2) {
                this.pointers[successor.id].prev = cell.id;
            }
            else if (cell.id === -2) {
                this.pointers[cell.id].prev = predecessor.id;
            }
        }
        this.alignForces();
    }
    popFirst(animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const head = this.getHead();
            const toDelete = this.getSuccessor(head);
            if (toDelete.id === -2) {
                return;
            }
            const node = toDelete.removeNode();
            node.setTarget(this.x, this.y - 200);
            yield this.deleteCell(toDelete, head);
            this.alignForces();
        });
    }
    popLast(animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const tail = this.getTail();
            const toDelete = this.getPredecessor(tail);
            if (toDelete.id === -2) {
                return;
            }
            const node = toDelete.removeNode();
            node.setTarget(this.x, this.y - 200);
            const predecessor = yield this.findPredecessor(toDelete, animate);
            yield this.deleteCell(toDelete, predecessor);
            this.alignForces();
        });
    }
    delete(index, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (index > this.data.length - 2 || index < 0) {
                throw new Error('Invalid index');
            }
            let predecessor = this.getHead();
            let cell = this.getSuccessor(predecessor);
            for (let i = 0; i < index; ++i) {
                if (this.double && predecessor) {
                    predecessor.highlight('#98dc73');
                }
                cell.highlight('#FF5A5A94');
                if (animate) {
                    yield new Promise(r => setTimeout(r, 600));
                }
                if (predecessor) {
                    predecessor.resetColor();
                }
                cell.resetColor();
                predecessor = cell;
                cell = this.getSuccessor(cell);
            }
            if (this.double) {
                predecessor = this.getPredecessor(cell);
                predecessor.highlight('#98dc73');
            }
            const node = cell.removeNode();
            node.setTarget(this.x, this.y - 200);
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            predecessor.resetColor();
            yield this.deleteCell(cell, predecessor);
            this.alignForces();
        });
    }
    deleteCell(cell, predecessor) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const deletionIndex = this.data.findIndex(c => c.id === cell.id);
            this.data.splice(deletionIndex, 1);
            const successor = this.getSuccessor(cell);
            this.pointers[predecessor.id].next = successor.id;
            this.linkHelper.removeLink(predecessor, cell);
            this.linkHelper.removeLink(cell, successor);
            this.linkHelper.addLink(predecessor, successor, this.double ? -20 : 0);
            if (this.double) {
                this.pointers[successor.id].prev = predecessor.id;
                this.linkHelper.removeLink(cell, predecessor);
                this.linkHelper.removeLink(successor, cell);
                this.linkHelper.addLink(successor, predecessor, 20);
            }
            else if (successor.id === -2) {
                this.pointers[successor.id].prev = predecessor.id;
            }
        });
    }
    alignForces() {
        const head = this.getHead();
        let predecessor = head;
        predecessor.graphMoved(this.x, this.y);
        let successor = this.getSuccessor(head);
        while (successor) {
            successor.graphMoved(predecessor.graphX + this.linkDistance, predecessor.graphY);
            predecessor = successor;
            successor = this.getSuccessor(successor);
        }
    }
    prepend(d, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const head = this.getHead();
            d.setTarget(head.x, head.y);
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            yield this.addToHead(d, head, animate);
        });
    }
    append(d, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const tail = this.getTail();
            d.setTarget(tail.x, tail.y);
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            yield this.addToTail(d, tail, animate);
        });
    }
    insert(d, index, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (index > this.data.length - 2 || index < 0) {
                throw new Error('Invalid index');
            }
            let startingCell = this.getHead();
            for (let i = 0; i < index; ++i) {
                startingCell.highlight('#98dc73');
                d.setTarget(startingCell.x, startingCell.y - 200);
                if (animate) {
                    yield new Promise(r => setTimeout(r, 600));
                }
                startingCell.resetColor();
                startingCell = this.getSuccessor(startingCell);
                if (animate) {
                    yield new Promise(r => setTimeout(r, 600));
                }
            }
            startingCell.highlight('#98dc73');
            d.setTarget(startingCell.x + this.linkDistance / 2, startingCell.y - 60);
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            startingCell.resetColor();
            const newCell = new _bst_cell__WEBPACK_IMPORTED_MODULE_2__["BstCell"](this, this.maxId++, startingCell.x, startingCell.y);
            if (animate) {
                yield new Promise(r => setTimeout(r, 300));
            }
            yield this.addCell(newCell, startingCell);
            newCell.setNode(d);
        });
    }
    add(d, addingCell) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (addingCell.id === -1) {
                yield this.addToHead(d, addingCell);
            }
            else if (addingCell.id === -2) {
                yield this.addToTail(d, addingCell);
            }
        });
    }
    addToHead(d, headCell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            headCell.setNode(d);
            d.lockedPlaceholder = headCell;
            let nextCell = new _bst_cell__WEBPACK_IMPORTED_MODULE_2__["BstCell"](this, this.maxId++, headCell.x, headCell.y);
            this.addCell(nextCell, headCell);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 300));
            }
            nextCell = this.getSuccessor(headCell);
            yield this.passNode(d, headCell, nextCell, animate);
        });
    }
    addToTail(d, tailCell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            tailCell.setNode(d);
            d.lockedPlaceholder = tailCell;
            const predecessor = this.getPredecessor(tailCell);
            let previousCell = new _bst_cell__WEBPACK_IMPORTED_MODULE_2__["BstCell"](this, this.maxId++, tailCell.x, tailCell.y);
            this.addCell(previousCell, predecessor);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 300));
            }
            previousCell = this.getPredecessor(tailCell);
            yield this.passNode(d, tailCell, previousCell, animate);
        });
    }
    passNode(d, source, target, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            d = source.removeNode();
            d.setTarget(source.x, source.y - 100);
            d.setTarget(target.x, target.y);
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            target.setNode(d);
            d.lockedPlaceholder = target;
        });
    }
    /**
     * Sets horizontal and vertical position of the linked list.
     * @param x - Horizontal position.
     * @param y - Vertical position.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.alignForces();
    }
    /**
     * Moves the whole tree if the cell is head, otherwise
     * returns the cell to its previous position
     * @param cell - Moved cell.
     * @param xPos - Horizontal position of the cell.
     * @param yPos - Vertical position of the cell.
     */
    moveCell(cell, xPos, yPos) {
        if (cell.isRoot) {
            this.setPosition(xPos, yPos);
            return;
        }
        else {
            cell.setTarget(cell.graphX, cell.graphY);
            return;
        }
    }
    getSuccessor(cell) {
        if (!cell) {
            return undefined;
        }
        const successorId = this.pointers[cell.id].next;
        if (successorId === undefined) {
            return undefined;
        }
        return this.data.find((c) => c.id === successorId);
    }
    findPredecessor(cell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (cell.id === -1) {
                return undefined;
            }
            else if (this.double || cell.id === -2) {
                const pred = this.getPredecessor(cell);
                pred.highlight('#98dc73');
                if (animate) {
                    yield new Promise(r => setTimeout(r, 600));
                }
                pred.resetColor();
                return pred;
            }
            let predecessor = this.getHead();
            while (predecessor) {
                const potentialCell = this.getSuccessor(predecessor);
                predecessor.highlight('#98dc73');
                if (animate) {
                    yield new Promise(r => setTimeout(r, 600));
                }
                predecessor.resetColor();
                if (potentialCell.id === cell.id) {
                    return predecessor;
                }
                predecessor = potentialCell;
            }
        });
    }
    getPredecessor(cell) {
        if (!cell) {
            return undefined;
        }
        if (this.double || cell.id === -2) {
            const predecessorId = this.pointers[cell.id].prev;
            if (predecessorId === undefined) {
                return undefined;
            }
            return this.data.find((c) => c.id === predecessorId);
        }
        return undefined;
    }
    getHead() {
        return this.getCellById(-1);
    }
    getTail() {
        return this.getCellById(-2);
    }
    getCellById(id) {
        return this.data.find((c) => c.id === id);
    }
}


/***/ }),

/***/ "mtIT":
/*!*************************************************!*\
  !*** ./src/scenarios/heap/scenes/heap-scene.ts ***!
  \*************************************************/
/*! exports provided: HeapScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeapScene", function() { return HeapScene; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class HeapScene {
    constructor() {
        this.id = 1;
        this.played = 'unplayable';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            const heap = simulation.objectFactory.create('heap', 0, 0);
            simulation.heapHandler.add(heap);
            for (const node of nodes) {
                yield heap.insert(node, false);
            }
        });
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Heap</h1>
  <p>
    Heap is a type of <em>complete binary tree</em>.
  </p>
  <p>
    <em>Binary</em> means that each node has at most two children nodes, whereas
    <em>complete</em> means that every node (except root and rightmost leaf) must have
    a sibling.
  </p>
  <p>
    The tree on the right-hand side is a such a complete binary tree. Besides being
    complete and binary, heap has some other properties:
  </p>
  <ul>
    <li>
        In a max heap, children contain value which is lower than their parent's value.
    </li>
    <li>
        In a <em>min heap</em>, children contain value which is higher than their parent's value.
        That means the root is holding the minimum value in the heap.
    </li>
  </ul>
  <small>Heap on the right side is a min-heap, right?</small>
  <p>
    Press next to see how that minimum value is extracted :D
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "mxwM":
/*!********************************************************!*\
  !*** ./src/app/core/simulation/helpers/link-helper.ts ***!
  \********************************************************/
/*! exports provided: LinkHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkHelper", function() { return LinkHelper; });
/* harmony import */ var _basics_simulation_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../basics/simulation-link */ "Cs7S");

class LinkHelper {
    constructor() {
        this.links = [];
    }
    addLink(source, target, yDisplacement = 0) {
        const link = new _basics_simulation_link__WEBPACK_IMPORTED_MODULE_0__["SimulationLink"](source, target, yDisplacement);
        this.links.push(link);
        return link;
    }
    removeLink(source, target) {
        if (!source || !target) {
            return;
        }
        const deletionIndex = this.links.findIndex((sl) => sl.source.id === source.id && sl.target.id === target.id);
        if (deletionIndex !== -1) {
            this.links.splice(deletionIndex, 1);
        }
    }
    detachCompletely(target) {
        this.links = this.links.filter((sl) => sl.source !== target && sl.target !== target);
    }
}


/***/ }),

/***/ "o5Jl":
/*!*****************************************************!*\
  !*** ./src/scenarios/stack-queue/scenes/dequeue.ts ***!
  \*****************************************************/
/*! exports provided: Dequeue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dequeue", function() { return Dequeue; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class Dequeue {
    constructor() {
        this.id = 5;
        this.played = 'not_played';
        this.index = -1;
        this.elements = '';
        this.queueSize = -1;
        this.firstValue = -1;
        this.lastValue = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.queue = simulation.objectFactory.create('queue', 0, 0, 10);
            simulation.arrayHandler.add(this.queue);
            for (const node of nodes) {
                yield this.queue.enqueue(node, false);
            }
            this.firstValue = this.queue.left.node.value;
            this.lastValue = this.queue.right.node.value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.queue.dequeue();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Queue - Dequeue operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's the queue implementation.
  </p>
  <p>
    The first element of the queue is <span style="color: #a0ff6f; font-weight: bold">${this.firstValue}</span>,
    and the last element is <span style="color: #ff9494; font-weight: bold">${this.lastValue}</span>.
  </p>
  <p>
    The operation that will be performed now is the <em>dequeue</em> operation,
    which is another crucial operation used for queues.
  </p>
  <p>
    In this configuration, dequeue is performed like a deletion of the first element from the array.
    However, the difference between the default deletion for arrays and the dequeue operation
    is that the empty space remains.
  </p>
  <p>
    Let's see how an element is dequeued from this queue.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    After successfully dequeueing the value ${this.firstValue}, the second element of the array
    at the index [1] has became the first element of the queue.
  </p>
  <small>Notice that remaining elements were not moved to the left in order to fill the empty space.</small>
    `;
    }
}


/***/ }),

/***/ "oN2I":
/*!**********************************************************************!*\
  !*** ./src/app/core/simulation/structures/array/simulation-array.ts ***!
  \**********************************************************************/
/*! exports provided: SimulationArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationArray", function() { return SimulationArray; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _array_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array-cell */ "lMj5");


class SimulationArray {
    constructor(id, x, y, descriptor) {
        this.cellWidth = 100;
        this.cellHeight = 100;
        this.size = 0;
        this.sorted = false;
        this.busy = false;
        this.id = id;
        this.cellWidth = 100;
        this.cellWidth = 100;
        this.data = [];
        this.z = -2;
        this.color = 'black';
        this.x = x;
        this.y = y;
        this.descriptor = descriptor !== null && descriptor !== void 0 ? descriptor : `array${id}`;
    }
    add(nodes) {
        nodes.forEach((n, i) => this.data[i].addNode(n));
    }
    nodeAt(i) {
        if (i === this.data.length) {
            return null;
        }
        if (this.data[i].node) {
            return this.data[i].node;
        }
        else {
            return this.nodeAt(i + 1);
        }
    }
    setTransform(x, y) {
        this.x = x;
        this.y = y;
        this.data.filter(d => d.node).forEach((d) => {
            d.node.move(this.x + d.x + d.width / 2, d.height / 2 + this.y);
        });
    }
    makeGrid(count) {
        let xpos = (this.cellWidth + this.cellWidth / 20) * this.data.length;
        const newSize = this.data.length + count;
        for (let column = this.data.length; column < newSize; column++) {
            this.data.push(new _array_cell__WEBPACK_IMPORTED_MODULE_1__["ArrayCell"](this, xpos, 0, this.cellWidth, this.cellHeight, column));
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += this.cellWidth + this.cellWidth / 20; // and a little bit of margin
        }
    }
    setCapacity(size) {
        this.capacity = size;
        if (size < this.data.length) {
            for (let i = size; i < this.data.length; i++) {
                if (!this.data[i].node) {
                    continue;
                }
                this.data[i].removeNode();
            }
            this.data = this.data.splice(0, size);
        }
        else {
            this.makeGrid(size - this.data.length);
        }
    }
    linearSearch(value) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (let i = 0; i < this.capacity; ++i) {
                const cell = this.data[i];
                if (!cell.node) {
                    continue;
                }
                cell.highlight('#fdd828');
                yield new Promise(r => setTimeout(r, 600));
                cell.resetColor();
                if (cell.node.value === value) {
                    cell.highlight('#28fd5d');
                    cell.node.highlighted = true;
                    yield new Promise(r => setTimeout(r, 1000));
                    cell.resetColor();
                    cell.node.highlighted = false;
                    return;
                }
            }
            yield new Promise(r => setTimeout(r, 300));
            throw new Error('Element not found');
        });
    }
    binarySearch(value) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.sorted) {
                throw new Error('Array is not sorted');
            }
            let low = 0;
            let high = this.size - 1;
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                const midCell = this.data[mid];
                const lowCell = this.data[low];
                const highCell = this.data[high];
                midCell.highlight('#fdd828');
                if (low !== high) {
                    lowCell.highlight('#48fd28');
                    highCell.highlight('#fd2828');
                }
                yield new Promise(r => setTimeout(r, 1000));
                midCell.resetColor();
                lowCell.resetColor();
                highCell.resetColor();
                if (value === midCell.node.value) {
                    midCell.highlight('#fdd828');
                    midCell.node.highlighted = true;
                    yield new Promise(r => setTimeout(r, 1000));
                    midCell.resetColor();
                    midCell.node.highlighted = false;
                    return;
                }
                else if (value > midCell.node.value) {
                    low = mid + 1;
                }
                else {
                    high = mid - 1;
                }
            }
            yield new Promise(r => setTimeout(r, 300));
            throw new Error('Element not found');
        });
    }
    deleteAt(index) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (index >= this.data.length || !this.data[index].node) {
                throw new Error('Incorrect index');
            }
            const node = this.data[index].removeNode();
            node.setTarget(this.x - 100, this.y - 100);
            yield this.move(index, false);
            return node;
        });
    }
    insertAt(node, index, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (index >= this.data.length) {
                throw new Error('Incorrect index');
            }
            if (!!this.data[index].node) {
                yield this.move(index, true, animate);
            }
            node.cx = this.data[index].x + this.x + this.cellWidth / 2;
            node.cy = this.data[index].y + this.y + this.cellHeight / 2;
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            this.data[index].addNode(node);
            if (animate) {
                yield new Promise(r => setTimeout(r, 300));
            }
        });
    }
    move(index, forward, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let i = forward ? this.data.length - 1 : index + 1;
            const step = forward ? 1 : -1;
            while ((forward && i >= index) || (!forward && i < this.data.length)) {
                if (!this.data[i].node) {
                    i -= step;
                    continue;
                }
                const node = this.data[i].removeNode();
                if (i + step > this.data.length || i + step < 0) {
                    continue;
                }
                node.cx = this.data[i + step].x + this.x + this.cellWidth / 2;
                node.cy = this.data[i + step].y + this.y + this.cellHeight / 2;
                if (animate) {
                    yield new Promise(r => setTimeout(r, 600));
                }
                this.data[i + step].addNode(node);
                if (animate) {
                    yield new Promise(r => setTimeout(r, 300));
                }
            }
        });
    }
    removeEmptySpaces() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (let i = 0; i < this.size; ++i) {
                if (!this.data[i].node) {
                    const currentCell = this.data[i];
                    const takenCell = yield this.findFirstTaken(i + 1);
                    if (!takenCell) {
                        return;
                    }
                    const node = takenCell.removeNode();
                    node.setTarget(currentCell.absoluteX, currentCell.absoluteY - 100);
                    yield new Promise(r => setTimeout(r, 600));
                    node.setTarget(currentCell.absoluteX, currentCell.absoluteY);
                    yield new Promise(r => setTimeout(r, 600));
                    currentCell.addNode(node);
                }
            }
        });
    }
    findFirstTaken(index) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            for (index; index < this.capacity; ++index) {
                if (!!this.data[index].node) {
                    this.data[index].highlight('#08ff00');
                    yield new Promise(r => setTimeout(r, 600));
                    this.data[index].resetColor();
                    return this.data[index];
                }
                this.data[index].highlight('#98dc73');
                yield new Promise(r => setTimeout(r, 600));
                this.data[index].resetColor();
            }
            return undefined;
        });
    }
    sort() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.sorting) {
                return;
            }
            yield this.removeEmptySpaces();
            yield this.sorting.sort(this);
            this.sorted = true;
            yield new Promise(r => setTimeout(r, 1800));
            this.data.filter(d => !!d.node).forEach(d => d.resetColor());
        });
    }
    swapNodes(source, destination) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!source.node || !destination.node) {
                return;
            }
            const sourceNode = source.removeNode();
            const dstNode = destination.removeNode();
            const middleX = (destination.absoluteX + source.absoluteX) / 2;
            sourceNode.setTarget(middleX, destination.absoluteY - 75);
            dstNode.setTarget(middleX, source.absoluteY + 75);
            yield new Promise(r => setTimeout(r, 600));
            sourceNode.setTarget(destination.absoluteX, destination.absoluteY);
            dstNode.setTarget(source.absoluteX, source.absoluteY);
            yield new Promise(r => setTimeout(r, 600));
            source.addNode(dstNode);
            destination.addNode(sourceNode);
        });
    }
    moveNode(source, destination) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!source.node || !!destination.node) {
                return;
            }
            const middleX = (destination.absoluteX + source.absoluteX) / 2;
            const sourceNode = source.removeNode();
            sourceNode.setTarget(middleX, destination.absoluteY - 100);
            yield new Promise(r => setTimeout(r, 600));
            sourceNode.setTarget(destination.absoluteX, destination.absoluteY);
            yield new Promise(r => setTimeout(r, 600));
            destination.addNode(sourceNode);
        });
    }
}


/***/ }),

/***/ "odae":
/*!****************************************************!*\
  !*** ./src/scenarios/linked-list/scenes/append.ts ***!
  \****************************************************/
/*! exports provided: Append */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Append", function() { return Append; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class Append {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
        this.currentLast = -1;
        this.newElement = 23.11;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0);
            simulation.linkedListHandler.add(this.list);
            for (const node of nodes) {
                yield this.list.append(node, false);
            }
            this.currentLast = nodes[nodes.length - 1].value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.newElement, -1, this.list.x, this.list.y - 200);
            simulation.nodeHandler.add(node);
            yield this.list.append(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linked list - prepend</h1>
  <p>
    The data structure on the right-hand side is a singly linked list.
  </p>
  <p>
    Now, let's see how to add an element with value ${this.newElement} to the end of a linked list.
  </p>
  <p>
    Appending is performed as follows:
  </p>
  <ul>
    <li>Get node referenced by <em>tail</em>;</li>
    <li>Set the new node as its successor;</li>
    <li>Set <em>tail's</em> reference to be the new node.</li>
  </ul>
  `;
    }
    successContent() {
        return `
  <p>
    Node with value ${this.newElement} is now added to the linked list, it is referenced by and it
    doesn't have a successor. However, it is referenced by both the node with value ${this.currentLast}
    and <em>tail</em>.
  </p>
    `;
    }
}


/***/ }),

/***/ "omR+":
/*!********************************************!*\
  !*** ./src/scenarios/sort/scenes/start.ts ***!
  \********************************************/
/*! exports provided: StartScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartScene", function() { return StartScene; });
class StartScene {
    constructor() {
        this.id = 0;
        this.played = 'unplayable';
    }
    setup(simulation) {
        const array = simulation.objectFactory.create('array', 0, 0);
        simulation.arrayHandler.add(array);
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Sorting</h1>
  <p>
    Sorting represents a process of reordering elements of a data structure according
    according to a predefined factor.
  </p>
  <p>
    The importance of sorting lies in the fact that data searching can be optimized to
    a very high level, if data is stored in a sorted manner. Sorting is also used to represent data in more readable formats.
  </p>
  <p>
    Sorting algorithms covered in this section are:
  </p>
  <ul>
    <li>Bubble sort;</li>
    <li>Insertion sort;</li>
    <li>Selection sort;</li>
    <li>Merge sort;</li>
    <li>Quick sort.</li>
  </ul>
  <p>
    Let's get started :)
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "pOMU":
/*!**********************************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/binary-tree/avl-tree/avl-tree.ts ***!
  \**********************************************************************************/
/*! exports provided: AvlTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvlTree", function() { return AvlTree; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _binary_search_tree_binary_search_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../binary-search-tree/binary-search-tree */ "LVtG");


class AvlTree extends _binary_search_tree_binary_search_tree__WEBPACK_IMPORTED_MODULE_1__["BinarySearchTree"] {
    constructor(id, x, y) {
        super(id, x, y);
        this.heights = {};
    }
    add(d, bstCell, animate = true) {
        const _super = Object.create(null, {
            add: { get: () => super.add }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield _super.add.call(this, d, bstCell);
            if (this.isValid) {
                yield this.checkBalance(bstCell, animate);
            }
        });
    }
    delete(value, animate = true) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const [node, affectedCell, deletedCell] = yield _super.delete.call(this, value);
            yield this.checkBalance(affectedCell, animate);
            return [node, affectedCell, deletedCell];
        });
    }
    /**
     * Updates the heights of the starting cell and all of its ancestors and checks if all nodes are balanced.
     * If an unbalanced node shows up, performs operations of balancing.
     * @param cell - The starting cell.
     * @param animate
     * @private
     */
    checkBalance(cell, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            while (!!cell) {
                if (this.heights[cell.id] === undefined) {
                    this.setHeight(cell, 0);
                    [cell] = this.getParent(cell);
                    continue;
                }
                if (!cell.node) {
                    delete this.heights[cell.id];
                    [cell] = this.getParent(cell);
                    continue;
                }
                const leftChild = this.getLeftChild(cell);
                const rightChild = this.getRightChild(cell);
                const leftHeight = this.getHeight(leftChild);
                const rightHeight = this.getHeight(rightChild);
                this.setHeight(cell, 1 + Math.max(leftHeight, rightHeight));
                const balance = leftHeight - rightHeight;
                if (!cell.node) {
                    [cell] = this.getParent(cell);
                    continue;
                }
                if (balance > 1) {
                    const leftsLeft = this.getLeftChild(leftChild);
                    const leftsRight = this.getRightChild(leftChild);
                    const leftBalance = this.getHeight(leftsLeft) - this.getHeight(leftsRight);
                    if (leftBalance < 0) {
                        yield this.leftRotation(leftChild, animate);
                        yield this.rightRotation(cell, animate);
                    }
                    else {
                        yield this.rightRotation(cell, animate);
                    }
                }
                else if (balance < -1) {
                    const rightsLeft = this.getLeftChild(rightChild);
                    const rightsRight = this.getRightChild(rightChild);
                    const rightBalance = this.getHeight(rightsLeft) - this.getHeight(rightsRight);
                    if (rightBalance > 0) {
                        yield this.rightRotation(rightChild, animate);
                        yield this.leftRotation(cell, animate);
                    }
                    else {
                        yield this.leftRotation(cell, animate);
                    }
                }
                [cell] = this.getParent(cell);
            }
        });
    }
    leftRotation(rotationRoot, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const newRoot = this.getRightChild(rotationRoot);
            const t = this.getLeftChild(newRoot);
            // Perform rotation
            this.linkHelper.removeLink(newRoot, t);
            this.setRightChild(rotationRoot, t);
            this.linkHelper.addLink(rotationRoot, t);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            const [rootParent, childIndex] = this.getParent(rotationRoot);
            this.detachParent(rotationRoot);
            this.linkHelper.removeLink(rootParent, rotationRoot);
            if (!rootParent) {
                newRoot.isRoot = true;
                newRoot.setDefaultDescriptor(rotationRoot.defaultDescriptor);
                rotationRoot.setDefaultDescriptor(undefined);
                rotationRoot.isRoot = false;
            }
            if (childIndex === 0) {
                this.setLeftChild(rootParent, newRoot);
            }
            else {
                this.setRightChild(rootParent, newRoot);
            }
            if (!!rootParent) {
                this.linkHelper.addLink(rootParent, newRoot);
            }
            // this.alignForces();
            // if (animate) {
            //   await new Promise(r => setTimeout(r, 600));
            // }
            this.linkHelper.removeLink(rotationRoot, newRoot);
            this.setLeftChild(newRoot, rotationRoot);
            this.linkHelper.addLink(newRoot, rotationRoot);
            this.alignForces();
            this.setHeight(rotationRoot, this.getUpdatedHeight(rotationRoot));
            this.setHeight(newRoot, this.getUpdatedHeight(newRoot));
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
        });
    }
    rightRotation(rotationRoot, animate = true) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const newRoot = this.getLeftChild(rotationRoot);
            const t = this.getRightChild(newRoot);
            // Perform rotation
            this.linkHelper.removeLink(newRoot, t);
            this.setLeftChild(rotationRoot, t);
            this.linkHelper.addLink(rotationRoot, t);
            this.alignForces();
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
            const [rootParent, childIndex] = this.getParent(rotationRoot);
            this.detachParent(rotationRoot);
            this.linkHelper.removeLink(rootParent, rotationRoot);
            if (!rootParent) {
                newRoot.isRoot = true;
                newRoot.setDefaultDescriptor(rotationRoot.defaultDescriptor);
                rotationRoot.setDefaultDescriptor(undefined);
                rotationRoot.isRoot = false;
            }
            if (childIndex === 0) {
                this.setLeftChild(rootParent, newRoot);
            }
            else {
                this.setRightChild(rootParent, newRoot);
            }
            if (!!rootParent) {
                this.linkHelper.addLink(rootParent, newRoot);
            }
            this.linkHelper.removeLink(rotationRoot, newRoot);
            this.setRightChild(newRoot, rotationRoot);
            this.linkHelper.addLink(newRoot, rotationRoot);
            this.alignForces();
            this.setHeight(rotationRoot, this.getUpdatedHeight(rotationRoot));
            this.setHeight(newRoot, this.getUpdatedHeight(newRoot));
            if (animate) {
                yield new Promise(r => setTimeout(r, 600));
            }
        });
    }
    getUpdatedHeight(cell) {
        const leftChild = this.getLeftChild(cell);
        const rightChild = this.getRightChild(cell);
        const leftHeight = this.getHeight(leftChild);
        const rightHeight = this.getHeight(rightChild);
        return 1 + Math.max(leftHeight, rightHeight);
    }
    getHeight(cell) {
        const height = !!cell ? this.heights[cell.id] : -1;
        return height !== null && height !== void 0 ? height : -1;
    }
    setHeight(cell, height) {
        if (!cell) {
            return;
        }
        this.heights[cell.id] = height;
        cell.addToDescriptor(`h=${height}`);
    }
}


/***/ }),

/***/ "pUoo":
/*!********************************************************!*\
  !*** ./src/scenarios/arrays/scenes/deletion-middle.ts ***!
  \********************************************************/
/*! exports provided: DeletionMiddle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionMiddle", function() { return DeletionMiddle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionMiddle {
    constructor() {
        this.id = 6;
        this.played = 'not_played';
        this.arrElement = -1;
        this.index = -1;
        this.arrSize = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            this.index = Math.floor(this.array.size / 2);
            this.arrElement = this.array.data[this.index].node.value;
            this.arrSize = !!this.array ? this.array.size : 10;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.array.deleteAt(this.index);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion from a given index of an array</h1>
  <p>
    Look at the array on the right-hand side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    What would happen if we wanted to delete an element from the index [${this.index}] of this array.
  </p>
  <p>
    What will happen to an empty space we're leaving after deletion of ${this.arrElement}?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    After removing ${this.arrElement} from the array, that empty space from [${this.index}]
    had to be gone.
  </p>
  <p>
    That was managed by moving all the elements starting from [${this.index + 1}]
    one place to the left.
  </p>
  `;
    }
}


/***/ }),

/***/ "ps8b":
/*!************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/svg-mouse.ts ***!
  \************************************************************/
/*! exports provided: SvgMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvgMouse", function() { return SvgMouse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basics/simulation-node */ "Q48m");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-context-menu */ "Ttfg");
/* harmony import */ var d3_context_menu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(d3_context_menu__WEBPACK_IMPORTED_MODULE_3__);




class SvgMouse {
    constructor(simulation) {
        this.simulation = simulation;
    }
    contextMenu() {
        const x = d3__WEBPACK_IMPORTED_MODULE_1__["event"].x;
        const y = d3__WEBPACK_IMPORTED_MODULE_1__["event"].y;
        const menu = [
            {
                title: 'Node',
                action: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const newValue = yield this.simulation.prompt('Value?');
                    const parsed = parseFloat(newValue);
                    if (isNaN(parsed)) {
                        return;
                    }
                    const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_2__["SimulationNode"](parsed, -1, x, y);
                    this.simulation.nodeHandler.add(node);
                })
            },
            {
                title: 'Array',
                action: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const size = yield this.simulation.prompt('Size?');
                    const parsed = parseFloat(size);
                    if (isNaN(parsed)) {
                        return;
                    }
                    const arr = this.simulation.objectFactory.create('array', x, y, parsed);
                    this.simulation.arrayHandler.add(arr);
                })
            },
            {
                title: 'Stack',
                action: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const size = yield this.simulation.prompt('Size?');
                    const parsed = parseFloat(size);
                    if (isNaN(parsed)) {
                        return;
                    }
                    const stack = this.simulation.objectFactory.create('stack', x, y, parsed);
                    stack.descriptor = `stack ${this.simulation.arrayHandler.maxId}`;
                    this.simulation.arrayHandler.add(stack);
                })
            },
            {
                title: 'Queue',
                action: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const size = yield this.simulation.prompt('Size?');
                    const parsed = parseFloat(size);
                    if (isNaN(parsed)) {
                        return;
                    }
                    const queue = this.simulation.objectFactory.create('queue', x, y, parsed);
                    queue.descriptor = `queue ${this.simulation.arrayHandler.maxId}`;
                    this.simulation.arrayHandler.add(queue);
                })
            },
            {
                title: 'Binary search tree',
                action: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const bst = this.simulation.objectFactory.create('bst', x, y);
                    this.simulation.bstHandler.add(bst);
                })
            },
            {
                title: 'Red-black tree',
                action: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const rbTree = this.simulation.objectFactory.create('rb', x, y);
                    this.simulation.bstHandler.add(rbTree);
                })
            },
            {
                title: 'AVL tree',
                action: () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    const avlTree = this.simulation.objectFactory.create('avl', x, y);
                    this.simulation.bstHandler.add(avlTree);
                })
            }
        ];
        if (!this.simulation.interactable) {
            return;
        }
        d3_context_menu__WEBPACK_IMPORTED_MODULE_3___default()(menu)(undefined, undefined);
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element
            .on('contextmenu', () => this.contextMenu());
        return element;
    }
}


/***/ }),

/***/ "r+2I":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/structures/tree/bst-cell.ts ***!
  \*************************************************************/
/*! exports provided: BstCell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BstCell", function() { return BstCell; });
class BstCell {
    constructor(tree, id, x, y, descriptor) {
        this.radius = 50;
        this.defaultColor = '#E2E8CE';
        this.color = '#E2E8CE';
        this.descriptorColor = '#000000';
        this.isRoot = false;
        this.noCollision = false;
        this.isMouseOver = false;
        this.isValid = true;
        this.graph = tree;
        this.cx = x;
        this.cy = y;
        this.x = x;
        this.y = y;
        this.graphX = x;
        this.graphY = y;
        this.id = id;
        this.setDefaultDescriptor(descriptor);
    }
    setTarget(x, y) {
        this.cx = x;
        this.cy = y;
    }
    graphMoved(x, y) {
        this.setTarget(x, y);
        this.graphX = x;
        this.graphY = y;
    }
    fixedMove(x, y) {
        this.fx = x;
        this.fy = y;
    }
    setNode(d) {
        this.node = d;
        this.node.fx = this.x;
        this.node.fy = this.y;
        this.node.noCollision = true;
        this.node.pointerEvents = false;
        this.node.nodeOrder = 2;
        d.lockedPlaceholder = this;
    }
    removeNode() {
        const d = this.node;
        if (!d) {
            return null;
        }
        this.node = undefined;
        d.fx = undefined;
        d.fy = undefined;
        d.noCollision = false;
        d.pointerEvents = true;
        d.hoveringPlaceholder = undefined;
        d.lockedPlaceholder = undefined;
        d.nodeOrder = 1;
        return d;
    }
    setDefaultColor(color) {
        this.defaultColor = color;
        this.color = color;
    }
    setDefaultDescriptor(descriptor) {
        var _a, _b;
        this.defaultDescriptor = descriptor;
        this.descriptor = `${(_a = this.defaultDescriptor) !== null && _a !== void 0 ? _a : ''} ${(_b = this.additionalDescriptor) !== null && _b !== void 0 ? _b : ''}`;
    }
    addToDescriptor(descriptor) {
        var _a, _b;
        this.additionalDescriptor = descriptor;
        this.descriptor = `${(_a = this.defaultDescriptor) !== null && _a !== void 0 ? _a : ''} ${(_b = this.additionalDescriptor) !== null && _b !== void 0 ? _b : ''}`;
    }
    highlight(color) {
        this.color = color;
    }
    resetColor() {
        this.color = this.defaultColor;
        return this.color;
    }
    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
        if (this.node) {
            this.node.x = val;
        }
    }
    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
        if (this.node) {
            this.node.y = val;
        }
    }
}


/***/ }),

/***/ "r1Km":
/*!************************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/linked-list-drawing.ts ***!
  \************************************************************************/
/*! exports provided: LinkedListDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedListDrawing", function() { return LinkedListDrawing; });
class LinkedListDrawing {
    enter(enterElement) {
        const treeElement = enterElement.append('g')
            .attr('class', 'linked-list');
        return treeElement;
    }
    update(updateElement) {
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
}


/***/ }),

/***/ "s6GJ":
/*!************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drag/array-drag.ts ***!
  \************************************************************/
/*! exports provided: ArrayDrag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayDrag", function() { return ArrayDrag; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class ArrayDrag {
    constructor(simulation) {
        this.simulation = simulation;
    }
    dragStart(d, i, arrays) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](arrays[i]).style('cursor', 'grabbing');
    }
    dragging(d, i, arrays) {
        d.setTransform(d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
    }
    dragEnd(d, i, arrays) {
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](arrays[i]).style('cursor', null);
    }
    addDragInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        const drag = d3__WEBPACK_IMPORTED_MODULE_0__["drag"]()
            .on('start', (d, i, arrays) => this.dragStart(d, i, arrays))
            .on('drag', (d, i, arrays) => this.dragging(d, i, arrays))
            .on('end', (d, i, arrays) => this.dragEnd(d, i, arrays));
        element.call(drag);
        return element;
    }
}


/***/ }),

/***/ "sjC/":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/queue-menu.ts ***!
  \*************************************************************/
/*! exports provided: queueMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueMenu", function() { return queueMenu; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../basics/simulation-node */ "Q48m");


const queueMenu = (simulation) => [
    {
        title: 'Change name',
        action: (elm) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            elm.descriptor = yield simulation.prompt('New name');
        })
    },
    {
        // divider
        divider: true
    },
    {
        title: 'Enqueue',
        action: (queue) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            const newValue = parseFloat(yield simulation.prompt('Which value to enqueue'));
            if (isNaN(newValue)) {
                alert('Value invalid');
                return;
            }
            const node = new _basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](newValue, -1, queue.x, queue.y - 200);
            simulation.nodeHandler.add(node);
            yield queue.enqueue(node);
        })
    },
    {
        title: 'Dequeue',
        action: (queue) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            yield queue.dequeue();
        })
    }
];


/***/ }),

/***/ "sqDJ":
/*!*****************************************************!*\
  !*** ./src/app/core/services/playground.service.ts ***!
  \*****************************************************/
/*! exports provided: PlaygroundService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaygroundService", function() { return PlaygroundService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PlaygroundService {
}
PlaygroundService.ɵfac = function PlaygroundService_Factory(t) { return new (t || PlaygroundService)(); };
PlaygroundService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PlaygroundService, factory: PlaygroundService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "tiDt":
/*!*****************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/node-drawing.ts ***!
  \*****************************************************************/
/*! exports provided: NodeDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeDrawing", function() { return NodeDrawing; });
class NodeDrawing {
    constructor(colorProvider) {
        this.radius = 40;
        this.colorProvider = colorProvider;
    }
    enter(enterElement) {
        const node = enterElement.append('g')
            .attr('class', 'node')
            .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
            .attr('pointer-events', d => d.pointerEvents ? 'auto' : 'none');
        // .call(
        //   d3.drag()
        //     .on('drag', (d, i, nodes) => this.nodeDragging(d as SimulationNode, i, nodes))
        //     .on('end', (d, i, nodes) => this.nodeDragEnd(d as SimulationNode, i, nodes))
        //     .on('start', (d, i, nodes) => this.nodeDragStart(d as SimulationNode, i, nodes))
        // );
        node
            .append('circle')
            .attr('class', 'node-circle')
            // .on('mouseover', (d, i, nodes) => this.nodeMouseOver(d, i, nodes))
            // .on('mouseout', (d, i, nodes) => this.nodeMouseOut(d, i, nodes))
            // .on('contextmenu', contextMenu(this.getContextMenu()))
            .attr('r', 0)
            .attr('fill', (d) => this.colorProvider.getNodeColor(d))
            .style('stroke-width', (d) => d.highlighted ? 5 : 0)
            .style('stroke-dasharray', '5,3') // make the stroke dashed
            .style('stroke', 'pink')
            .style('stroke-opacity', (d) => d.isPlaceholder ? 0.4 : 0)
            .style('stroke-width', (d) => d.isPlaceholder ? 5 : 0)
            .style('stroke-dasharray', (d) => d.isPlaceholder ? '10,3' : '0,0') // make the stroke dashed
            .style('stroke', 'black')
            .style('opacity', (d) => d.isPlaceholder ? 0.8 : 1)
            .style('cursor', (d) => d.isInteractable ? 'pointer' : 'not-allowed')
            .transition()
            .duration(500)
            .attr('r', this.radius);
        node
            .append('text')
            .attr('class', 'circle-value')
            .attr('dy', this.radius / 4)
            .text(d => d.isValueVisible ? d.value : '')
            .style('text-anchor', 'middle')
            .attr('dx', this.radius / 2.3)
            .style('fill', '#E2E8CE')
            .attr('pointer-events', 'none')
            // check if number is visible. else hide the number
            .attr('font-size', d => this.calculateFontSize(d.value.toString()))
            // enter animation
            .style('opacity', 0)
            .transition()
            .duration(500)
            .style('opacity', 1);
        node
            .append('text')
            .attr('class', 'circle-name')
            .style('fill', 'black')
            .attr('dx', (d) => d.isPlaceholder ? 0 : -40 / 2)
            .attr('dy', (d) => d.isPlaceholder ? 40 / 8 : 40 / 4)
            .style('text-anchor', 'middle')
            .attr('pointer-events', 'none')
            .attr('font-size', 0)
            .raise()
            .text(d => !d.isPlaceholder ? `#${d.id}` : 'null')
            .transition()
            .duration(500)
            .attr('font-size', 16);
        node.append('line')
            .attr('class', 'circle-arrow')
            .attr('x1', 0)
            .attr('y1', -150)
            .attr('x2', 0)
            .attr('y2', -100)
            .attr('stroke', 'white')
            .attr('stroke-width', 5)
            .attr('opacity', d => d.drawArrow ? 0.8 : 0)
            .attr('marker-end', 'url(#arrowhead)');
        return node;
    }
    update(updateElement) {
        updateElement
            .attr('class', 'node')
            .attr('pointer-events', d => d.pointerEvents ? 'auto' : 'none');
        updateElement.select('.node-circle')
            .attr('fill', (d) => this.colorProvider.getNodeColor(d))
            .style('stroke-width', d => {
            // if (!d.validInBST) {
            //   return 5;
            // }
            if (d.highlighted) {
                return 10;
            }
            if (d.isPlaceholder) {
                return 5;
            }
            else {
                return 0;
            }
        })
            // if placeholder
            .style('stroke-opacity', d => d.isPlaceholder || d.highlighted ? 0.4 : 0)
            .style('stroke-dasharray', d => {
            // if (d.isPlaceholder) return "10,3"
            // if (!d.validInBST) {
            //   return '5,3';
            // }
            if (d.highlighted) {
                return '5,3';
            }
            else {
                return '0,0';
            }
        })
            .style('stroke', d => {
            // if (!d.validInBST) {
            //   return 'red';
            // }
            if (d.isPlaceholder) {
                return 'black';
            }
            if (d.highlighted) {
                return 'green';
            }
        })
            .raise()
            // animation
            .filter((d) => d.highlighted)
            .transition()
            .duration(400)
            .attr('r', this.radius * 1.5)
            .transition()
            .duration(500)
            .attr('r', this.radius);
        updateElement
            .select('.circle-value')
            .text(d => d.isValueVisible ? d.value : '')
            .attr('font-size', d => this.calculateFontSize(d.value.toString()))
            .raise();
        updateElement
            .select('.circle-name')
            .text(d => !d.isPlaceholder ? `#${d.id}` : 'null')
            .raise();
        updateElement
            .select('.circle-arrow')
            .attr('x1', 0)
            .attr('y1', -150)
            .attr('x2', 0)
            .attr('y2', -100)
            .attr('opacity', d => d.drawArrow ? 0.8 : 0)
            .raise();
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
    calculateFontSize(value) {
        let len;
        if (!value) {
            len = 1;
        }
        else {
            len = value.length;
        }
        if (len === 1) {
            return this.radius;
        }
        else {
            return this.radius / len * 1.5;
        }
    }
}


/***/ }),

/***/ "tyHO":
/*!**********************************************!*\
  !*** ./src/scenarios/arrays/scenes/start.ts ***!
  \**********************************************/
/*! exports provided: StartScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartScene", function() { return StartScene; });
class StartScene {
    constructor() {
        this.id = 0;
        this.played = 'unplayable';
    }
    setup(simulation) {
        const array = simulation.objectFactory.create('array', 0, 0);
        simulation.arrayHandler.add(array);
    }
    play(simulation) {
    }
    content() {
        return `
  <h1 class="scene-title">Array visualization</h1>
  <p>
    Here, you will learn the fundamentals regarding arrays.
  </p>
  <p>
    One such array is present on the right-hand-side of this visualization.
    It consists of a collection of elements (values or variables),
    each identified by at least one array index or key (denoted as<i>[index]</i>).
  </p>
  <p>
    Try and interact with the array to familiarize yourself with the environment.
    Array fundamentals which are covered in this section are as follows:
  </p>
  <ul>
    <li>Linear search of elements;</li>
    <li>Inserting elements;</li>
    <li>Deleting elements;</li>
    <li>Finding elements in a sorted array - <em>binary search</em>.</li>
  </ul>
  <p>
    Let's get started :)
  </p>
  `;
    }
    successContent() {
        return '';
    }
}


/***/ }),

/***/ "u1wl":
/*!*************************************************************************!*\
  !*** ./src/scenarios/binary-search-tree/scenes/deletion-no-children.ts ***!
  \*************************************************************************/
/*! exports provided: DeletionNoChildren */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionNoChildren", function() { return DeletionNoChildren; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionNoChildren {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toRemove = -1;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(8);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('bst', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
            const cellToRemove = this.getNodeWithoutChildren(this.bst);
            this.toRemove = cellToRemove.node.value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.delete(this.toRemove);
        });
    }
    getNodeWithoutChildren(bst) {
        let cell = bst.getRoot();
        while (!!bst.getLeftChild(cell).node || !!bst.getRightChild(cell).node) {
            const leftChild = bst.getLeftChild(cell);
            if (!!leftChild.node) {
                cell = leftChild;
                continue;
            }
            const rightChild = bst.getRightChild(cell);
            if (!!rightChild.node) {
                cell = rightChild;
            }
        }
        return cell;
    }
    content() {
        return `
  <h1 class="scene-title">Deletion - No children</h1>
  <p>
    It's quite complicated to delete an element from a binary search tree. There are
    three cases:
  </p>
  <ol>
    <li>
      <b><small>The node we're deleting</small> doesn't have any children (its children are empty leaves);</b>
    </li>
    <li>
      <small>The node we're deleting</small> has only one child (the other one is an empty leaf);
    </li>
    <li>
      <small>The node we're deleting</small> has two children.
    </li>
  </ol>
  <p>
    Now, let's see the first case and remove the node with value ${this.toRemove}.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    This case was quite simple, and the node containing ${this.toRemove} was simply deleted from
    the tree.
  </p>
    `;
    }
}


/***/ }),

/***/ "u4Gn":
/*!**************************************************************!*\
  !*** ./src/scenarios/binary-search-tree/scenes/imbalance.ts ***!
  \**************************************************************/
/*! exports provided: Imbalance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Imbalance", function() { return Imbalance; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class Imbalance {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.searchValue = -1;
        this.rootValue = -1;
        this.rightOrLeft = 'left';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(8);
            nodes.sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('bst', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
            this.searchValue = nodes[6].value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.find(this.searchValue);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Searching - imbalance</h1>
  <p>
    There is a chance that we might insert nodes in an increasing or decreasing order.
  </p>
  <p>
    Then, our binary search tree will look like it looks on the right side.
  </p>
  <p>
    Now, finding ${this.searchValue} is just like searching for that same value in a linked list.
  </p>
  <small>This tree leans towards the right side and it's completely unbalanced.
  If the nodes were evenly spread, this tree would have been balanced</small>
  `;
    }
    successContent() {
        return `
  <p>
    While searching for ${this.searchValue}, our only option was to go down through right children, and
    after visiting almost each node, we have found ${this.searchValue}.
  </p>
    `;
    }
}


/***/ }),

/***/ "uYMK":
/*!***********************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/array-cell-drawing.ts ***!
  \***********************************************************************/
/*! exports provided: ArrayCellDrawing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayCellDrawing", function() { return ArrayCellDrawing; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class ArrayCellDrawing {
    enter(enterElement) {
        const arrayCell = enterElement.append('g')
            .attr('class', 'array-cell');
        arrayCell
            .append('text')
            .attr('class', 'array-cell-name')
            .attr('dx', (d) => d.x + d.width / 2)
            .attr('dy', 125)
            .text((d) => d.toString())
            .attr('font-size', 25) // font size
            .style('fill', 'white')
            .style('text-anchor', 'middle');
        arrayCell
            .append('rect')
            .attr('class', 'array-cell-container')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('rx', d => d.rx)
            .attr('ry', d => d.ry)
            .attr('width', d => d.width)
            .attr('height', d => d.height)
            .style('fill', d => d.color)
            .style('opacity', .9)
            .style('stroke-width', 5);
        return arrayCell;
    }
    update(updateElement) {
        updateElement
            .select('.array-cell-name')
            .attr('dx', (d) => d.x + d.width / 2)
            .text((d) => d.toString());
        updateElement
            .select('.array-cell-container')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('width', d => d.width)
            .attr('height', d => d.height);
        updateElement
            .select('.array-cell-container')
            .style('fill', d => d.defaultColor)
            .transition()
            .duration(600)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeExpOut"])
            .attr('rx', d => d.rx)
            .attr('ry', d => d.ry)
            .style('fill', d => d.color);
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
}


/***/ }),

/***/ "vNhy":
/*!***********************************************!*\
  !*** ./src/scenarios/arrays/scenes/search.ts ***!
  \***********************************************/
/*! exports provided: SearchScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchScene", function() { return SearchScene; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class SearchScene {
    constructor() {
        this.id = 1;
        this.played = 'not_played';
        this.arrElement = -1;
        this.arrSize = -1;
        this.movedElements = '';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0, 10);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
            if (!this.array || !this.array.data[6].node) {
                this.arrElement = -1;
            }
            else {
                this.arrElement = this.array.data[6].node.value;
            }
            this.arrSize = !!this.array ? this.array.size : 10;
            this.movedElements = this.array.data.slice(0, 6).map(d => d.node.value).join(', ');
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.array.linearSearch(this.arrElement);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Linear search</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    What do you think would be the best method to find a node with value ${this.arrElement}?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
    }
    successContent() {
        return `
  <p>
    If you guessed that you should check every element starting from the first one, then you guessed correctly.
  </p>
  <p>
    The algorithm has checked every single element, [${this.movedElements}]
    before it successfully found ${this.arrElement}.
  </p>
  <p>
    How do we determine if element is not present in the array?
  </p>
`;
    }
}


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _view_main_frame_main_frame_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/main-frame/main-frame.component */ "/u1V");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _view_scenario_grid_scenario_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/scenario-grid/scenario-grid.component */ "I0+v");
/* harmony import */ var _view_scene_view_scene_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/scene-view/scene-view.component */ "biAk");
/* harmony import */ var _view_playground_playground_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/playground/playground.component */ "8Gdb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    {
        path: '',
        component: _view_main_frame_main_frame_component__WEBPACK_IMPORTED_MODULE_0__["MainFrameComponent"],
        children: [
            {
                path: '',
                component: _view_scenario_grid_scenario_grid_component__WEBPACK_IMPORTED_MODULE_2__["ScenarioGridComponent"]
            },
            {
                path: 'visualize/:path',
                redirectTo: 'visualize/:path/0'
            },
            {
                path: 'visualize/:path/:sceneIndex',
                component: _view_scene_view_scene_view_component__WEBPACK_IMPORTED_MODULE_3__["SceneViewComponent"]
            },
            {
                path: 'playground',
                component: _view_playground_playground_component__WEBPACK_IMPORTED_MODULE_4__["PlaygroundComponent"]
            }
        ]
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


/***/ }),

/***/ "wAZR":
/*!*******************************************************************!*\
  !*** ./src/app/core/simulation/helpers/mouse/array-cell-mouse.ts ***!
  \*******************************************************************/
/*! exports provided: ArrayCellMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayCellMouse", function() { return ArrayCellMouse; });
class ArrayCellMouse {
    constructor(simulation) {
        this.simulation = simulation;
    }
    mouseOver(d, i, cells) {
        d.isMouseOver = true;
        // if dragging node and cell not holding node, then attach it to array cell
        if (!this.simulation.loop.draggedNode || !!d.node) {
            return;
        }
        d.rx = 50;
        d.ry = 50;
        this.simulation.loop.draggedNode.hoveringGrid = d;
        d.hoveringNode = this.simulation.loop.draggedNode;
        this.simulation.loop.draggedNode.move(d.parent.x + d.x + d.width / 2, d.height / 2 + d.parent.y);
        // now check if array is valid and color it accordingly
    }
    mouseOut(d, i, cells) {
        d.isMouseOver = false;
        d.rx = 25;
        d.ry = 25;
        if (!this.simulation.loop.draggedNode || !!d.node) {
            return;
        }
        if (d.hoveringNode !== d.node) {
            d.hoveringNode = d.node;
        }
        else {
            d.hoveringNode = undefined;
        }
        this.simulation.loop.draggedNode.hoveringGrid = null;
    }
    addMouseInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        element
            .on('mouseover', (d, i, cells) => this.mouseOver(d, i, cells))
            .on('mouseout', (d, i, cells) => this.mouseOut(d, i, cells));
        return element;
    }
}


/***/ }),

/***/ "wHz4":
/*!************************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drawing/link-drawing-helper.ts ***!
  \************************************************************************/
/*! exports provided: LinkDrawingHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkDrawingHelper", function() { return LinkDrawingHelper; });
class LinkDrawingHelper {
    enter(enterElement) {
        const linkElement = enterElement
            .append('line')
            .attr('class', 'link')
            .attr('stroke', 'white')
            .attr('stroke-width', 10)
            .attr('stroke-linecap', 'round')
            .attr('stroke-opacity', 0.6);
        return linkElement;
    }
    update(updateElement) {
        return updateElement;
    }
    exit(exitElement) {
        return exitElement.remove();
    }
}


/***/ }),

/***/ "wWIz":
/*!**************************************************************!*\
  !*** ./src/scenarios/rb-tree/scenes/deletion-second-case.ts ***!
  \**************************************************************/
/*! exports provided: DeletionSecondCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletionSecondCase", function() { return DeletionSecondCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");

class DeletionSecondCase {
    constructor() {
        this.id = 2;
        this.played = 'not_played';
        this.toDelete = 40;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = this.createNodes(simulation, [30, 10, 40, 5]);
            simulation.nodeHandler.add(nodes);
            this.bst = simulation.objectFactory.create('rb', 0, 0);
            simulation.bstHandler.add(this.bst);
            for (const node of nodes) {
                yield this.bst.insert(node, false);
            }
            const [deleted] = yield this.bst.delete(5, false);
            simulation.nodeHandler.remove(deleted);
        });
    }
    createNodes(simulation, values) {
        const nodes = [];
        for (const value of values) {
            nodes.push(simulation.objectFactory.create('node', 0, 0, value));
        }
        return nodes;
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.bst.delete(this.toDelete);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Deletion - second case</h1>

  <p>
    In the second case, sibling is colored black and both of its children are
    black, recoloring is performed so sibling becomes red and the deleted
    node's parent becomes black.
  </p>
  <p>
    If the deleted node's parent was red, checking is propagated up the tree.
  </p>
  <p>
    This case is demonstrated on the right-hand side by deletion of ${this.toDelete}
    from the tree.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    All the properties of red-black tree are restored now by performing tri-node-restructuring.
  </p>
  <small>
    In this case, since 30 was root and thus black, checking wasn't propagated up the tree.
  </small>
    `;
    }
}


/***/ }),

/***/ "wbhT":
/*!***********************************************!*\
  !*** ./src/app/core/simulation/simulation.ts ***!
  \***********************************************/
/*! exports provided: Simulation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Simulation", function() { return Simulation; });
/* harmony import */ var _handlers_node_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers/node-handler */ "BytK");
/* harmony import */ var _handlers_array_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/array-handler */ "3Aa0");
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../camera */ "615e");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _handlers_simulation_loop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handlers/simulation-loop */ "xxJp");
/* harmony import */ var _helpers_drawing_node_drawing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/drawing/node-drawing */ "tiDt");
/* harmony import */ var _providers_color_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./providers/color-provider */ "9TY2");
/* harmony import */ var _helpers_drag_node_drag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/drag/node-drag */ "30CF");
/* harmony import */ var _helpers_mouse_node_mouse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/mouse/node-mouse */ "1slk");
/* harmony import */ var _helpers_drawing_array_drawing__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/drawing/array-drawing */ "3cFF");
/* harmony import */ var _helpers_drawing_array_cell_drawing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/drawing/array-cell-drawing */ "uYMK");
/* harmony import */ var _helpers_drag_array_drag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/drag/array-drag */ "s6GJ");
/* harmony import */ var _helpers_mouse_array_cell_mouse__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/mouse/array-cell-mouse */ "wAZR");
/* harmony import */ var _helpers_mouse_array_mouse__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./helpers/mouse/array-mouse */ "7t2/");
/* harmony import */ var _handlers_binary_search_tree_handler__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./handlers/binary-search-tree-handler */ "KzYP");
/* harmony import */ var _helpers_drawing_bst_drawing__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers/drawing/bst-drawing */ "hdS/");
/* harmony import */ var _helpers_drawing_bst_cell_drawing__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/drawing/bst-cell-drawing */ "2mVW");
/* harmony import */ var _helpers_drag_bst_cell_drag__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./helpers/drag/bst-cell-drag */ "zCV+");
/* harmony import */ var _helpers_mouse_bst_cell_mouse__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./helpers/mouse/bst-cell-mouse */ "XGK1");
/* harmony import */ var _helpers_drawing_link_drawing_helper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./helpers/drawing/link-drawing-helper */ "wHz4");
/* harmony import */ var _helpers_mouse_bst_mouse__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./helpers/mouse/bst-mouse */ "lzel");
/* harmony import */ var _handlers_heap_handler__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./handlers/heap-handler */ "zJWd");
/* harmony import */ var _helpers_drawing_heap_drawing__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./helpers/drawing/heap-drawing */ "bJYZ");
/* harmony import */ var _helpers_mouse_heap_mouse__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./helpers/mouse/heap-mouse */ "Nv6G");
/* harmony import */ var _handlers_linked_list_handler__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./handlers/linked-list-handler */ "4nPk");
/* harmony import */ var _helpers_drawing_linked_list_drawing__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./helpers/drawing/linked-list-drawing */ "r1Km");
/* harmony import */ var _helpers_mouse_linked_list_mouse__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./helpers/mouse/linked-list-mouse */ "kZ6W");
/* harmony import */ var _object_factory__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./object-factory */ "3B/d");
/* harmony import */ var _helpers_mouse_svg_mouse__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./helpers/mouse/svg-mouse */ "ps8b");





























class Simulation {
    constructor(canvas, prompt) {
        this.widthHeight = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([0, 0]);
        this.interactable = true;
        this.canvas = canvas;
        this.prompt = prompt;
    }
    startSimulation(svg) {
        this.loop = new _handlers_simulation_loop__WEBPACK_IMPORTED_MODULE_4__["SimulationLoop"]();
        this.loop.setupForce();
        this.svgMouse = new _helpers_mouse_svg_mouse__WEBPACK_IMPORTED_MODULE_28__["SvgMouse"](this);
        this.svgMouse.addMouseInteraction(svg);
        this.objectFactory = new _object_factory__WEBPACK_IMPORTED_MODULE_27__["ObjectFactory"]();
        this.camera = new _camera__WEBPACK_IMPORTED_MODULE_2__["Camera"](svg, this.canvas, this.widthHeight.getValue());
        this.widthHeight.subscribe(val => {
            this.camera.widthHeight.next(val);
        });
        this.camera.setZoom();
        const colorProvider = new _providers_color_provider__WEBPACK_IMPORTED_MODULE_6__["ColorProvider"]();
        const nodeDrawing = new _helpers_drawing_node_drawing__WEBPACK_IMPORTED_MODULE_5__["NodeDrawing"](colorProvider);
        const nodeDrag = new _helpers_drag_node_drag__WEBPACK_IMPORTED_MODULE_7__["NodeDrag"](this);
        const nodeMouse = new _helpers_mouse_node_mouse__WEBPACK_IMPORTED_MODULE_8__["NodeMouse"](this);
        this.nodeHandler = new _handlers_node_handler__WEBPACK_IMPORTED_MODULE_0__["NodeHandler"](nodeDrawing, nodeDrag, nodeMouse, this.canvas, this, colorProvider);
        this.arrayHandler = new _handlers_array_handler__WEBPACK_IMPORTED_MODULE_1__["ArrayHandler"](this, new _helpers_drawing_array_drawing__WEBPACK_IMPORTED_MODULE_9__["ArrayDrawing"](), new _helpers_drawing_array_cell_drawing__WEBPACK_IMPORTED_MODULE_10__["ArrayCellDrawing"](), new _helpers_drag_array_drag__WEBPACK_IMPORTED_MODULE_11__["ArrayDrag"](this), new _helpers_mouse_array_mouse__WEBPACK_IMPORTED_MODULE_13__["ArrayMouse"](this), new _helpers_mouse_array_cell_mouse__WEBPACK_IMPORTED_MODULE_12__["ArrayCellMouse"](this), this.canvas);
        this.bstHandler = new _handlers_binary_search_tree_handler__WEBPACK_IMPORTED_MODULE_14__["BinarySearchTreeHandler"](this, null, new _helpers_drawing_bst_drawing__WEBPACK_IMPORTED_MODULE_15__["BstDrawing"](), new _helpers_mouse_bst_mouse__WEBPACK_IMPORTED_MODULE_20__["BstMouse"](this), new _helpers_drawing_bst_cell_drawing__WEBPACK_IMPORTED_MODULE_16__["BstCellDrawing"](), new _helpers_drag_bst_cell_drag__WEBPACK_IMPORTED_MODULE_17__["BstCellDrag"](this), new _helpers_mouse_bst_cell_mouse__WEBPACK_IMPORTED_MODULE_18__["BstCellMouse"](this, colorProvider), new _helpers_drawing_link_drawing_helper__WEBPACK_IMPORTED_MODULE_19__["LinkDrawingHelper"](), this.canvas);
        this.heapHandler = new _handlers_heap_handler__WEBPACK_IMPORTED_MODULE_21__["HeapHandler"](this, null, new _helpers_drawing_heap_drawing__WEBPACK_IMPORTED_MODULE_22__["HeapDrawing"](), new _helpers_mouse_heap_mouse__WEBPACK_IMPORTED_MODULE_23__["HeapMouse"](this), new _helpers_drawing_bst_cell_drawing__WEBPACK_IMPORTED_MODULE_16__["BstCellDrawing"](), new _helpers_drag_bst_cell_drag__WEBPACK_IMPORTED_MODULE_17__["BstCellDrag"](this), new _helpers_mouse_bst_cell_mouse__WEBPACK_IMPORTED_MODULE_18__["BstCellMouse"](this, colorProvider), new _helpers_drawing_link_drawing_helper__WEBPACK_IMPORTED_MODULE_19__["LinkDrawingHelper"](), this.canvas);
        this.linkedListHandler = new _handlers_linked_list_handler__WEBPACK_IMPORTED_MODULE_24__["LinkedListHandler"](this, null, new _helpers_drawing_linked_list_drawing__WEBPACK_IMPORTED_MODULE_25__["LinkedListDrawing"](), new _helpers_mouse_linked_list_mouse__WEBPACK_IMPORTED_MODULE_26__["LinkedListMouse"](this), new _helpers_drawing_bst_cell_drawing__WEBPACK_IMPORTED_MODULE_16__["BstCellDrawing"](), new _helpers_drag_bst_cell_drag__WEBPACK_IMPORTED_MODULE_17__["BstCellDrag"](this), new _helpers_mouse_bst_cell_mouse__WEBPACK_IMPORTED_MODULE_18__["BstCellMouse"](this, colorProvider), new _helpers_drawing_link_drawing_helper__WEBPACK_IMPORTED_MODULE_19__["LinkDrawingHelper"](), this.canvas);
        this.loop.setHandlers(this.nodeHandler, this.bstHandler, this.heapHandler, this.linkedListHandler, this.arrayHandler);
    }
    reset() {
        this.loop.drawableHandlers.forEach(h => h.reset());
    }
}


/***/ }),

/***/ "wegX":
/*!*********************************************!*\
  !*** ./src/scenarios/heap/heap-scenario.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/core/simulation/scenario */ "8UQL");
/* harmony import */ var _scenes_tree_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/tree-scene */ "R1Ht");
/* harmony import */ var _scenes_insertion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/insertion */ "h0Z1");
/* harmony import */ var _scenes_deletion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/deletion */ "LNM3");
/* harmony import */ var _scenes_heap_scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/heap-scene */ "mtIT");
/* harmony import */ var _scenes_find_min__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/find-min */ "Vpx9");






const heapScenario = new _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__["Scenario"]('Heap', 'heap', 'Extracting the minimum value, insertion and deletion.');
heapScenario.cover = 'scenarios/heap/cover.png';
heapScenario.scenes = [
    _scenes_tree_scene__WEBPACK_IMPORTED_MODULE_1__["TreeScene"],
    _scenes_heap_scene__WEBPACK_IMPORTED_MODULE_4__["HeapScene"],
    _scenes_find_min__WEBPACK_IMPORTED_MODULE_5__["FindMin"],
    _scenes_insertion__WEBPACK_IMPORTED_MODULE_2__["Insertion"],
    _scenes_deletion__WEBPACK_IMPORTED_MODULE_3__["Deletion"]
];
/* harmony default export */ __webpack_exports__["default"] = (heapScenario);


/***/ }),

/***/ "wkCR":
/*!**************************************************!*\
  !*** ./src/scenarios/stack-queue/scenes/push.ts ***!
  \**************************************************/
/*! exports provided: Push */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Push", function() { return Push; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/basics/simulation-node */ "Q48m");


class Push {
    constructor() {
        this.id = 1;
        this.played = 'not_played';
        this.index = -1;
        this.elements = '';
        this.stackSize = -1;
        this.highlighedValue = -1;
        this.newElement = 23.11;
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(6);
            simulation.nodeHandler.add(nodes);
            this.stack = simulation.objectFactory.create('stack', 0, 0, 10);
            simulation.arrayHandler.add(this.stack);
            for (const node of nodes) {
                yield this.stack.push(node, false);
            }
            this.stack.descriptor = 'stack';
            this.stackSize = !!this.stack ? this.stack.size : 10;
            this.elements = this.stack.data.slice(0, this.stack.size).map(c => c.node.value).join(', ');
            this.highlighedValue = this.stack.top.node.value;
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const node = new _app_core_simulation_basics_simulation_node__WEBPACK_IMPORTED_MODULE_1__["SimulationNode"](this.newElement, -1, this.stack.x, this.stack.y - 200);
            simulation.nodeHandler.add(node);
            yield this.stack.push(node);
        });
    }
    content() {
        return `
  <h1 class="scene-title">Stack - Push operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's our stack with elements ${this.elements}.
  </p>
  <p>
    There are ${this.stackSize} elements in the stack.
    The highlighted element ${this.highlighedValue} is the <em>top element</em> of the stack.
  </p>
  <p>
    The first operation we're going to look into is <b>push</b> operation. That simply
    means appending an element to the end of this array.
  </p>
  <p>
    Let's see how elements are pushed to this stack by pushing ${this.newElement}.
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    After successfully pushing ${this.newElement} to the stack, the <em>top</em> is now at the top of the stack.
  </p>
  <small>
    If the stack were full, the push operation would lead to a condition called <em>stack overflow</em>.
  </small>
    `;
    }
}


/***/ }),

/***/ "xCmF":
/*!*********************************************!*\
  !*** ./src/scenarios/sort/scenes/bubble.ts ***!
  \*********************************************/
/*! exports provided: Bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bubble", function() { return Bubble; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _app_core_simulation_structures_array_bubble_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/core/simulation/structures/array/bubble-sort */ "1pPF");


class Bubble {
    constructor() {
        this.id = 0;
        this.played = 'not_played';
    }
    setup(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const nodes = simulation.nodeHandler.generateNodes(10);
            simulation.nodeHandler.add(nodes);
            this.array = simulation.objectFactory.create('array', 0, 0);
            simulation.arrayHandler.add(this.array);
            for (let i = 0; i < nodes.length; ++i) {
                yield this.array.insertAt(nodes[i], i, false);
            }
        });
    }
    play(simulation) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.array.sorting = new _app_core_simulation_structures_array_bubble_sort__WEBPACK_IMPORTED_MODULE_1__["BubbleSort"]();
            yield this.array.sort();
        });
    }
    content() {
        return `
  <h1 class="scene-title">Bubble sort</h1>
  <p>
    Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
    compares adjacent elements and swaps them if they are in the wrong order.
    The pass through the list is repeated until the list is sorted. The algorithm
    is named for the way smaller or larger elements "bubble" to the top of the list.
  </p>
  <p>
    In this example, elements will be sorted in ascending order.
  </p>

  <p>
    Press play to sort the elements
  </p>
  `;
    }
    successContent() {
        return `
  <p>
    Bubble sort has a worst-case and average complexity of <em>О(n<sup>2</sup>)</em>, where n is the
    number of items being sorted. Most practical sorting algorithms have substantially
    better worst-case or average complexity, often <em>О(n logn)</em>. Even other  <em>О(n<sup>2</sup>)</em> sorting
    algorithms, such as insertion sort, generally run faster than bubble sort, and are no
    more complex. Therefore, bubble sort is not a practical sorting algorithm.
  </p>
    `;
    }
}


/***/ }),

/***/ "xxJp":
/*!*************************************************************!*\
  !*** ./src/app/core/simulation/handlers/simulation-loop.ts ***!
  \*************************************************************/
/*! exports provided: SimulationLoop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationLoop", function() { return SimulationLoop; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class SimulationLoop {
    constructor() {
        this.nodes = [];
        this.drawableHandlers = [];
    }
    setupForce() {
        this.force = d3__WEBPACK_IMPORTED_MODULE_0__["forceSimulation"]([])
            .force('x', d3__WEBPACK_IMPORTED_MODULE_0__["forceX"]()
            .x((d) => d.cx)
            .strength(.2))
            .force('y', d3__WEBPACK_IMPORTED_MODULE_0__["forceY"]()
            .y((d) => d.cy)
            .strength(.2))
            .force('link', d3__WEBPACK_IMPORTED_MODULE_0__["forceLink"]([])
            .distance(100)
            .strength(.2))
            .force('collision', d3__WEBPACK_IMPORTED_MODULE_0__["forceCollide"]()
            .strength(1)
            .radius((n) => n.radius))
            .alphaTarget(.5)
            .velocityDecay(.6)
            .on('tick', this.ticked(30));
    }
    ticked(interval) {
        let then = Date.now();
        return () => {
            var _a, _b, _c, _d, _e, _f, _g;
            const now = Date.now();
            const elapsed = now - then;
            const fpsInterval = 1000 / interval;
            if (elapsed > fpsInterval) {
                then = now - (elapsed / fpsInterval);
                const svg = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('svg');
                svg.lower();
                this.nodeElements = svg.selectAll('.node');
                this.arrayElements = svg.selectAll('.array');
                this.bstCellElements = svg.selectAll('.bst-cell');
                this.nodes = this.bstCellElements.data().concat(this.nodeElements.data().filter(d => !d.noCollision));
                this.force.nodes(this.nodes);
                this.links = svg.selectAll('.link');
                // @ts-ignore
                this.force.force('link').links(this.links);
                this.drawableHandlers.forEach(handler => handler.draw());
                (_a = this.nodeElements) === null || _a === void 0 ? void 0 : _a.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
                (_b = this.arrayElements) === null || _b === void 0 ? void 0 : _b.attr('transform', d => `translate(${d.x}, ${d.y})`);
                (_c = this.bstCellElements) === null || _c === void 0 ? void 0 : _c.attr('transform', d => `translate(${d.x}, ${d.y})`);
                (_g = (_f = (_e = (_d = this.links) === null || _d === void 0 ? void 0 : _d.attr('x1', (d) => d.source.x)) === null || _e === void 0 ? void 0 : _e.attr('y1', (d) => d.source.y + d.yDisplacement)) === null || _f === void 0 ? void 0 : _f.attr('x2', (d) => d.target.x)) === null || _g === void 0 ? void 0 : _g.attr('y2', (d) => d.target.y + d.yDisplacement);
            }
        };
    }
    setHandlers(...drawableHandlers) {
        this.drawableHandlers = drawableHandlers;
    }
}


/***/ }),

/***/ "yesG":
/*!***********************************************************!*\
  !*** ./src/scenarios/stack-queue/stack-queue-scenario.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../app/core/simulation/scenario */ "8UQL");
/* harmony import */ var _scenes_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/stack */ "ZY5H");
/* harmony import */ var _scenes_push__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/push */ "wkCR");
/* harmony import */ var _scenes_pop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/pop */ "DFYs");
/* harmony import */ var _scenes_enqueue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/enqueue */ "hvE2");
/* harmony import */ var _scenes_queue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scenes/queue */ "Wtot");
/* harmony import */ var _scenes_dequeue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/dequeue */ "o5Jl");
/* harmony import */ var _scenes_circular_queue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scenes/circular-queue */ "4+bX");








const stackQueueScenario = new _app_core_simulation_scenario__WEBPACK_IMPORTED_MODULE_0__["Scenario"]('Stack and queue', 'stack-queue', 'Array implementations of stack and queue.');
stackQueueScenario.cover = 'scenarios/stack-queue/cover.png';
stackQueueScenario.scenes = [
    _scenes_stack__WEBPACK_IMPORTED_MODULE_1__["Stack"],
    _scenes_push__WEBPACK_IMPORTED_MODULE_2__["Push"],
    _scenes_pop__WEBPACK_IMPORTED_MODULE_3__["Pop"],
    _scenes_queue__WEBPACK_IMPORTED_MODULE_5__["Queue"],
    _scenes_enqueue__WEBPACK_IMPORTED_MODULE_4__["Enqueue"],
    _scenes_dequeue__WEBPACK_IMPORTED_MODULE_6__["Dequeue"],
    _scenes_circular_queue__WEBPACK_IMPORTED_MODULE_7__["CircularQueue"]
];
/* harmony default export */ __webpack_exports__["default"] = (stackQueueScenario);


/***/ }),

/***/ "zCV+":
/*!***************************************************************!*\
  !*** ./src/app/core/simulation/helpers/drag/bst-cell-drag.ts ***!
  \***************************************************************/
/*! exports provided: BstCellDrag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BstCellDrag", function() { return BstCellDrag; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");

class BstCellDrag {
    constructor(simulation) {
        this.simulation = simulation;
    }
    dragStart(d, i, cells) {
        d.fixedMove(d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](cells[i]).style('cursor', 'grabbing');
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](cells[i]).raise();
    }
    dragging(d, i, cells) {
        d.fixedMove(d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
    }
    dragEnd(d, i, cells) {
        d.fx = undefined;
        d.fy = undefined;
        d.graph.moveCell(d, d3__WEBPACK_IMPORTED_MODULE_0__["event"].x, d3__WEBPACK_IMPORTED_MODULE_0__["event"].y);
        d3__WEBPACK_IMPORTED_MODULE_0__["select"](cells[i]).style('cursor', null);
    }
    addDragInteraction(element) {
        if (!this.simulation.interactable) {
            return element;
        }
        const drag = d3__WEBPACK_IMPORTED_MODULE_0__["drag"]()
            .on('start', (d, i, cells) => this.dragStart(d, i, cells))
            .on('drag', (d, i, cells) => this.dragging(d, i, cells))
            .on('end', (d, i, cells) => this.dragEnd(d, i, cells));
        element.call(drag);
        return element;
    }
}


/***/ }),

/***/ "zJWd":
/*!**********************************************************!*\
  !*** ./src/app/core/simulation/handlers/heap-handler.ts ***!
  \**********************************************************/
/*! exports provided: HeapHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeapHandler", function() { return HeapHandler; });
class HeapHandler {
    constructor(simulation, dragHelper, drawingHelper, mouseHelper, bstCellDrawingHelper, bstCellDragHelper, bstCellMouseHelper, linkDrawingHelper, canvas) {
        this.data = [];
        this.maxId = 0;
        this.simulation = simulation;
        this.dragHelper = dragHelper;
        this.drawingHelper = drawingHelper;
        this.mouseHelper = mouseHelper;
        this.bstCellDrawingHelper = bstCellDrawingHelper;
        this.bstCellDragHelper = bstCellDragHelper;
        this.bstCellMouseHelper = bstCellMouseHelper;
        this.linkDrawingHelper = linkDrawingHelper;
        this.canvas = canvas;
    }
    add(tree) {
        tree.id = this.maxId++;
        tree.setRoot();
        this.data.push(tree);
    }
    draw() {
        const treeElements = this.canvas
            .selectAll('.heap')
            .data(this.data, (tree) => tree.id)
            .join(enterElement => this.enter(enterElement), updateElement => this.update(updateElement), exitElement => this.exit(exitElement));
        treeElements.lower();
    }
    enter(enterElement) {
        const treeElement = this.drawingHelper.enter(enterElement);
        this.mouseHelper.addMouseInteraction(treeElement);
        treeElement
            .selectAll('.bst-cell')
            .data((d) => d.getData(), (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.bstCellDrawingHelper.enter(enterCell);
            this.bstCellDragHelper.addDragInteraction(cellElement);
            this.bstCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        });
        treeElement
            .selectAll('.link')
            .data((d) => d.getLinks(), (link) => `${link.source.id}_${link.target.id}`)
            .join(enterLink => {
            const linkElement = this.linkDrawingHelper.enter(enterLink);
            linkElement.lower();
            return linkElement;
        });
        return treeElement;
    }
    update(updateElement) {
        this.drawingHelper.update(updateElement);
        updateElement
            .selectAll('.bst-cell')
            .data((d) => d.getData(), (cell) => cell.id)
            .join(enterCell => {
            const cellElement = this.bstCellDrawingHelper.enter(enterCell);
            this.bstCellDragHelper.addDragInteraction(cellElement);
            this.bstCellMouseHelper.addMouseInteraction(cellElement);
            return cellElement;
        }, updateCell => this.bstCellDrawingHelper.update(updateCell), exitCell => this.bstCellDrawingHelper.exit(exitCell));
        updateElement
            .selectAll('.link')
            .data((d) => d.getLinks(), (link) => `${link.target.id}_${link.target.id}`)
            .join(enterLink => {
            const linkElement = this.linkDrawingHelper.enter(enterLink);
            linkElement.lower();
            return linkElement;
        }, updateLink => this.linkDrawingHelper.update(updateLink).lower(), exitLink => this.linkDrawingHelper.exit(exitLink));
        return updateElement;
    }
    exit(exitElement) {
        return this.drawingHelper.exit(exitElement);
    }
    reset() {
        this.maxId = 0;
        this.data = [];
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map