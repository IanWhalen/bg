goog.provide('bg.SpecialEvent');

bg.SpecialEvent = function(board) {
    this.board = board;
}


bg.SpecialEvent.prototype.0001 = function(loc) {
    this.board.addFoe(loc.name);
    this.board.addFoe(loc.name);
}

bg.SpecialEvent.prototype.0002 = function(locs) {
    for (var each in foeLayer.children_) {
        var foe = foeLayer.children_[each];
        if (foe.loc.name in locs) {
            // TODO: return foe to monster cup
        }
    }
}
