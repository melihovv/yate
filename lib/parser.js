module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = function(insert) {return insert;},
        peg$c2 = function(condition) {return condition;},
        peg$c3 = function(content) {return content;},
        peg$c4 = function(text) {return text;},
        peg$c5 = { type: "other", description: "insert" },
        peg$c6 = peg$FAILED,
        peg$c7 = function(id) {
                if (isUndefined(local[id]) && isUndefined(_this.context[id])) {
                    throw Error('Variable \'' + id + '\' is undefined');
                }

                if (isNotPrimitive(_this.context[id])) {
                    throw Error('Variable \'' + _this.context[id] + '\' is not primitive');
                }

                return local[id] || _this.context[id];
            },
        peg$c8 = { type: "other", description: "assignment" },
        peg$c9 = "=",
        peg$c10 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c11 = function(id, number) {
                local[id] = number;
            },
        peg$c12 = function(id, unit) {
                if (isUndefined(local[id]) && isUndefined(_this.context[id])) {
                    throw Error('Variable \'' + id + '\' is undefined');
                }

                if (local[id] || _this.context[id]) {
                    return Array.prototype.join.call(unit, '');
                }
            },
        peg$c13 = function(id, body) {
                if (isUndefined(_this.context[id])) {
                    throw Error('Variable \'' + id + '\' is undefined');
                }

                var objects = _this.context[id];
                if (!Array.isArray(objects)) {
                    throw Error(objects + ' is not an array');
                }

                var result = '';

                objects.forEach(function (object) {
                    if (typeof object !== 'object') {
                        throw Error(object + ' is not an object');
                    }

                    body.forEach(function (key) {
                        if (Array.isArray(key)) {
                            if (isUndefined(object[key[0]])) {
                                throw Error('Variable \'' + key[0] + '\' is undefined');
                            }

                            if (isNotPrimitive(object[key[0]])) {
                                throw Error('Variable \'' + object[key[0]] + '\' is not primitive');
                            }

                            result += object[key[0]];
                        } else if (key) {
                            result += key;
                        }
                    });
                });
                return result;
            },
        peg$c14 = function(id) {
                return [id, 'eachLoop'];
            },
        peg$c15 = function(id) {return id;},
        peg$c16 = function(unit) {return unit;},
        peg$c17 = { type: "other", description: "ifStartBlock" },
        peg$c18 = function(id) {
                return id;
            },
        peg$c19 = { type: "other", description: "ifEndBlockSymbols" },
        peg$c20 = "{{/if",
        peg$c21 = { type: "literal", value: "{{/if", description: "\"{{/if\"" },
        peg$c22 = { type: "other", description: "ifOpenSymbols" },
        peg$c23 = "{{#if",
        peg$c24 = { type: "literal", value: "{{#if", description: "\"{{#if\"" },
        peg$c25 = { type: "other", description: "eachStartBlock" },
        peg$c26 = { type: "other", description: "eachStartBlockOpenSymbols" },
        peg$c27 = "{{#each",
        peg$c28 = { type: "literal", value: "{{#each", description: "\"{{#each\"" },
        peg$c29 = { type: "other", description: "eachEndBlock" },
        peg$c30 = "{{/each",
        peg$c31 = { type: "literal", value: "{{/each", description: "\"{{/each\"" },
        peg$c32 = { type: "other", description: "insertOpenSymbols" },
        peg$c33 = "{{",
        peg$c34 = { type: "literal", value: "{{", description: "\"{{\"" },
        peg$c35 = { type: "other", description: "insertEachLoopOpenSymbols" },
        peg$c36 = "{{+",
        peg$c37 = { type: "literal", value: "{{+", description: "\"{{+\"" },
        peg$c38 = { type: "other", description: "assigmentOpenSymbols" },
        peg$c39 = "{{@",
        peg$c40 = { type: "literal", value: "{{@", description: "\"{{@\"" },
        peg$c41 = { type: "other", description: "closeSymbols" },
        peg$c42 = "}}",
        peg$c43 = { type: "literal", value: "}}", description: "\"}}\"" },
        peg$c44 = { type: "other", description: "id" },
        peg$c45 = /^[A-z$_]/,
        peg$c46 = { type: "class", value: "[A-z$_]", description: "[A-z$_]" },
        peg$c47 = /^[A-z0-9$_]/,
        peg$c48 = { type: "class", value: "[A-z0-9$_]", description: "[A-z0-9$_]" },
        peg$c49 = { type: "other", description: "number" },
        peg$c50 = "0",
        peg$c51 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c52 = /^[1-9]/,
        peg$c53 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c54 = /^[0-9]/,
        peg$c55 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c56 = function(number) {return Number(number);},
        peg$c57 = { type: "other", description: "text" },
        peg$c58 = function(text) {return text},
        peg$c59 = { type: "other", description: "char" },
        peg$c60 = void 0,
        peg$c61 = { type: "any", description: "any character" },
        peg$c62 = function(char) {return char;},
        peg$c63 = { type: "other", description: "white spaces" },
        peg$c64 = function(ws) {return ws;},
        peg$c65 = { type: "other", description: "white spaces mandatory" },
        peg$c66 = function(nl) {return nl;},
        peg$c67 = "\n",
        peg$c68 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c69 = function() {return '\n';},
        peg$c70 = "\r\n",
        peg$c71 = { type: "literal", value: "\r\n", description: "\"\\r\\n\"" },
        peg$c72 = function() {return '\r\n';},
        peg$c73 = "\r",
        peg$c74 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c75 = function() {return '\r';},
        peg$c76 = "\t",
        peg$c77 = { type: "literal", value: "\t", description: "\"\\t\"" },
        peg$c78 = function() {return '\t';},
        peg$c79 = " ",
        peg$c80 = { type: "literal", value: " ", description: "\" \"" },
        peg$c81 = function() {return ' ';},

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseunit();
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseunit();
      }

      return s0;
    }

    function peg$parseunit() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseinsert();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$parseassignment();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsecondition();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c2(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseeachLoop();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c3(s1);
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parsetext();
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c4(s1);
              }
              s0 = s1;
            }
          }
        }
      }

      return s0;
    }

    function peg$parseinsert() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseinsertOpenSymbols();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecloseSymbols();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c7(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }

      return s0;
    }

    function peg$parseassignment() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseassignmentOpenSymbols();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c9;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c10); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsews();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parsenumber();
                if (s7 !== peg$FAILED) {
                  s7 = input.substring(s6, peg$currPos);
                }
                s6 = s7;
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsecloseSymbols();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c11(s2, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c6;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c6;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c6;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c6;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }

      return s0;
    }

    function peg$parsecondition() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseifStartBlock();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseunit();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseunit();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseifEndBlock();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c12(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }

      return s0;
    }

    function peg$parseeachLoop() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseeachStartBlock();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseeachLoopBody();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseeachLoopBody();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseeachEndBlock();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c13(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }

      return s0;
    }

    function peg$parseeachLoopInsert() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseinsertEachLoopOpenSymbols();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseid();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecloseSymbols();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c14(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }

      return s0;
    }

    function peg$parseeachLoopBody() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseeachLoopInsert();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c15(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseunit();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c16(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseifStartBlock() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseifStartBlockOpenSymbols();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecloseSymbols();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c18(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }

      return s0;
    }

    function peg$parseifEndBlock() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c20) {
        s1 = peg$c20;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecloseSymbols();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }

      return s0;
    }

    function peg$parseifStartBlockOpenSymbols() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c23) {
        s1 = peg$c23;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewsmandatory();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }

      return s0;
    }

    function peg$parseeachStartBlock() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseeachStartBlockOpenSymbols();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parseid();
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecloseSymbols();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c18(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }

      return s0;
    }

    function peg$parseeachStartBlockOpenSymbols() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c27) {
        s1 = peg$c27;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c28); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewsmandatory();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }

      return s0;
    }

    function peg$parseeachEndBlock() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c30) {
        s1 = peg$c30;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecloseSymbols();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }

      return s0;
    }

    function peg$parseinsertOpenSymbols() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c33) {
        s1 = peg$c33;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }

      return s0;
    }

    function peg$parseinsertEachLoopOpenSymbols() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c36) {
        s1 = peg$c36;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }

      return s0;
    }

    function peg$parseassignmentOpenSymbols() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c39) {
        s1 = peg$c39;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parsecloseSymbols() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c42) {
          s2 = peg$c42;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c43); }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }

      return s0;
    }

    function peg$parseid() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      if (peg$c45.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c46); }
      }
      if (s3 !== peg$FAILED) {
        s4 = [];
        if (peg$c47.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          if (peg$c47.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c48); }
          }
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c6;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c6;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c15(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s2 = peg$c50;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }
      if (s2 === peg$FAILED) {
        s2 = peg$currPos;
        if (peg$c52.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          if (peg$c54.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c55); }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (peg$c54.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c55); }
            }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c6;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c6;
        }
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c56(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }

      return s0;
    }

    function peg$parsetext() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      s3 = peg$parsechar();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsechar();
        }
      } else {
        s2 = peg$c6;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c58(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c57); }
      }

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseinsertOpenSymbols();
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c60;
      } else {
        peg$currPos = s1;
        s1 = peg$c6;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        s3 = peg$parseassignmentOpenSymbols();
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = peg$c60;
        } else {
          peg$currPos = s2;
          s2 = peg$c6;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parseifStartBlockOpenSymbols();
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c60;
          } else {
            peg$currPos = s3;
            s3 = peg$c6;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseeachStartBlockOpenSymbols();
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = peg$c60;
            } else {
              peg$currPos = s4;
              s4 = peg$c6;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.length > peg$currPos) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c61); }
              }
              if (s6 !== peg$FAILED) {
                s6 = input.substring(s5, peg$currPos);
              }
              s5 = s6;
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c62(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c6;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c6;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c6;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c6;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c6;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c59); }
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      s3 = peg$parsenl();
      if (s3 === peg$FAILED) {
        s3 = peg$parsetab();
        if (s3 === peg$FAILED) {
          s3 = peg$parsespace();
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsenl();
        if (s3 === peg$FAILED) {
          s3 = peg$parsetab();
          if (s3 === peg$FAILED) {
            s3 = peg$parsespace();
          }
        }
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c64(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c63); }
      }

      return s0;
    }

    function peg$parsewsmandatory() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      s3 = peg$parsenl();
      if (s3 === peg$FAILED) {
        s3 = peg$parsetab();
        if (s3 === peg$FAILED) {
          s3 = peg$parsespace();
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsenl();
          if (s3 === peg$FAILED) {
            s3 = peg$parsetab();
            if (s3 === peg$FAILED) {
              s3 = peg$parsespace();
            }
          }
        }
      } else {
        s2 = peg$c6;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c64(s1);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c65); }
      }

      return s0;
    }

    function peg$parsenl() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseunl();
      if (s2 === peg$FAILED) {
        s2 = peg$parsewnl();
        if (s2 === peg$FAILED) {
          s2 = peg$parsemnl();
        }
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c66(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseunl() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 10) {
        s1 = peg$c67;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c69();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsewnl() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c70) {
        s1 = peg$c70;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c71); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c72();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemnl() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 13) {
        s1 = peg$c73;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c75();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsetab() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 9) {
        s1 = peg$c76;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c78();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsespace() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c79;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c80); }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c81();
      }
      s0 = s1;

      return s0;
    }


        var _this = this;
        _this.context || (_this.context = {});
        var local = {};

        function isNotPrimitive(value) {
            return Array.isArray(value) || typeof value === 'object';
        }

        function isUndefined(value) {
            return typeof value === 'undefined';
        }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();