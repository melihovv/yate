start
    = nodes:node*
        {return nodes;}

node
    = node:
    (insertion
    / assignment
    / condition
    / conditionLine
    / eachLoop
    / eachLoopLine
    / text)
        {return node;}

insertion 'insertion'
    = OPEN_SYMBOLS id:$ID CLOSE_SYMBOLS
        {return {type: 'insertion', 'id': id};}

assignment 'assignment'
    = ASSIGNMENT_OPEN id:$ID WS '=' WS number:$NUMBER CLOSE_SYMBOLS
        {return {type: 'assignment', 'id': id, value: number};}

condition 'condition'
    = id:IF_START_BLOCK nodes:node* IF_END_BLOCK
        {return {type: 'condition', 'id': id, body: nodes};}

conditionLine 'conditionLine'
    = id:IF_LINE_START_BLOCK nodes:node* IF_LINE_END_BLOCK
        {return {type: 'condition_line', 'id': id, body: nodes};}

eachLoop 'eachLoop'
    = id:EACH_START_BLOCK nodes:node* EACH_END_BLOCK
        {return {type: 'each', 'id': id, body: nodes};}

eachLoopLine 'eachLoopLine'
    = id:EACH_LINE_START_BLOCK nodes:node* EACH_LINE_END_BLOCK
        {return {type: 'each_line', 'id': id, body: nodes};}

IF_START_BLOCK 'IF_START_BLOCK'
    = IF_START_BLOCK_OPEN_SYMBOLS id:$ID CLOSE_SYMBOLS
        {return id;}

IF_END_BLOCK 'IF_END_BLOCK'
    = OPEN_SYMBOLS_NO_WS '/if' CLOSE_SYMBOLS

IF_START_BLOCK_OPEN_SYMBOLS 'IF_START_BLOCK_OPEN_SYMBOLS'
    = OPEN_SYMBOLS_NO_WS '#if' MANDATORY_WS

IF_LINE_START_BLOCK 'IF_LINE_START_BLOCK'
    = IF_LINE_START_BLOCK_OPEN_SYMBOLS id:$ID CLOSE_SYMBOLS
        {return id;}

IF_LINE_END_BLOCK 'IF_LINE_END_BLOCK'
    = OPEN_SYMBOLS_NO_WS '/if_line' CLOSE_SYMBOLS

IF_LINE_START_BLOCK_OPEN_SYMBOLS 'IF_LINE_START_BLOCK_OPEN_SYMBOLS'
    = OPEN_SYMBOLS_NO_WS '#if_line' MANDATORY_WS

EACH_START_BLOCK 'EACH_START_BLOCK'
    = EACH_START_BLOCK_OPEN_SYMBOLS id:$ID CLOSE_SYMBOLS
        {return id;}

EACH_START_BLOCK_OPEN_SYMBOLS 'EACH_START_BLOCK_OPEN_SYMBOLS'
    = OPEN_SYMBOLS_NO_WS '#each' MANDATORY_WS

EACH_END_BLOCK 'EACH_END_BLOCK'
    = OPEN_SYMBOLS_NO_WS '/each' CLOSE_SYMBOLS

EACH_LINE_START_BLOCK 'EACH_LINE_START_BLOCK'
    = EACH_LINE_START_BLOCK_OPEN_SYMBOLS id:$ID CLOSE_SYMBOLS
        {return id;}

EACH_LINE_START_BLOCK_OPEN_SYMBOLS 'EACH_LINE_START_BLOCK_OPEN_SYMBOLS'
    = OPEN_SYMBOLS_NO_WS '#each_line' MANDATORY_WS

EACH_LINE_END_BLOCK 'EACH_LINE_END_BLOCK'
    = OPEN_SYMBOLS_NO_WS '/each_line' CLOSE_SYMBOLS

ASSIGNMENT_OPEN 'ASSIGNMENT_OPEN'
    = OPEN_SYMBOLS_NO_WS '@' WS

OPEN_SYMBOLS 'OPEN_SYMBOLS'
    = '{{' WS

OPEN_SYMBOLS_NO_WS 'OPEN_SYMBOLS_NO_WS'
    = '{{'

CLOSE_SYMBOLS 'CLOSE_SYMBOLS'
    = WS '}}'

ID 'ID'
    = id:$([A-z$_][A-z0-9$_]*)
        {return id;}

NUMBER 'NUMBER'
    = number:$('0' / ([1-9][0-9]*))
        {return number;}

text 'text'
    = text:$CHAR+
        {return {type: 'text', 'text': text};}

CHAR 'CHAR'
    = !OPEN_SYMBOLS
      !ASSIGNMENT_OPEN
      !IF_START_BLOCK_OPEN_SYMBOLS
      !IF_LINE_START_BLOCK_OPEN_SYMBOLS
      !EACH_START_BLOCK_OPEN_SYMBOLS
      !EACH_LINE_START_BLOCK_OPEN_SYMBOLS
      char:.
        {return char;}

// White spaces
WS 'WHITE_SPACES'
    = (NL / TAB / SPACE)*
MANDATORY_WS 'MANDATORY_WHITE_SPACES'
    = (NL / TAB / SPACE)+

TAB   = '\t'
SPACE = ' '

// New line: unix, windows or old-mac style
NL
    = (UNIX_NL / WINDOWS_NL / OLD_MAC_OS_NL)

UNIX_NL = '\n'
WINDOWS_NL = '\r\n'
OLD_MAC_OS_NL = '\r'
