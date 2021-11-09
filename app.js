
'use strict';

let dragging = false;
let tableDraggable, lines, cells, headerRow, columnsNumber, selectedColumn;

/**
 * Stops drag and drop process.
 **/
document.addEventListener('mouseup', function (e) {
	reorderColumn(e.target);

	// Disable dragging process.
	dragging = false;

	// Remove columns selection.
	for (let x = 0; x < lines.length; x++) {
		for (let y = 0; y < lines[x].cells.length; y++) {
			lines[x].cells[y].classList.remove('hover');
			lines[x].cells[y].classList.remove('selected');
		}
	}
});

/**
 * Attaches drag and drop support for the table.
 **/
document.addEventListener('DOMContentLoaded', function () {
	tableDraggable = document.getElementById('drug-and-drop');
	lines = tableDraggable.getElementsByTagName('tr');
	cells = tableDraggable.getElementsByTagName('td');
	headerRow = tableDraggable.rows[0];
	columnsNumber = headerRow.cells.length;

	// Disable table content selection.
	tableDraggable.onselectstart = function (e) {
		e.preventDefault();
	};

	tableDraggable.onmousedown = function (e) {
		e.preventDefault();
	};

	for (let x = 0; x < cells.length; x++) {
		dragAndDropInit(cells[x]);
		cells[x].onmouseover = columnHighlight;
		cells[x].onmouseout = columnHighlight;
	}
});

/**
 * Inits drug and drop process.
 *
 * @param cell
 *   Table cell element.
 */
function dragAndDropInit(cell) {
	cell.onmousedown = function (e) {
		e.preventDefault();

		// Highlight column as selected.
		for (let x = 0; x < lines.length; x++) {
			lines[x].cells[this.cellIndex].classList.add('selected');
		}
		// Enable dragging process.
		dragging = true;

		// Update global selected column number.
		selectedColumn = cell.cellIndex;
	}
}

/**
* Reorder table columns and puts selected table column to the new place.
**/
function reorderColumn(obj) {
	let newColumn = obj.cellIndex;

	// Not table cell.
	if (newColumn == null) {
		return;
	}

	// The same place. Do nothing.
	if (selectedColumn === newColumn) {
		return;
	}

	for (let x = 0; x < lines.length; x++) {
		let cells = lines[x].cells;
		let cellToDrag = lines[x].removeChild(cells[selectedColumn]);
		// Move all cells to the new place.
		lines[x].insertBefore(cellToDrag, cells[newColumn])
	}
}

/**
 * Highlights table columns during drag and drop.
 */
function columnHighlight(e) {
	let cell = this;
	if (e.type === "mouseover") {
		for (let x = 0; x < lines.length; x++) {
			if (cell.className !== "selected") {
				lines[x].cells[this.cellIndex].classList.add('hover');
			}
		}
	} else if (e.type === "mouseout") {
		for (let x = 0; x < lines.length; x++) {
			if (this.className !== "selected") {
				lines[x].cells[this.cellIndex].classList.remove('hover');
			}
		}
	}
}
