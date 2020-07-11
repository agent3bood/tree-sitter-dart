const DIGITS = token(sep1(/[0-9]+/, /_+/))
const HEX_DIGITS = token(sep1(/[A-Fa-f0-9]+/, '_'))
// const PREC = {
//     COMMA: -1,
//     DECLARATION: 1,
//     COMMENT: 1,
//     ASSIGN: 0,
//     OBJECT: 1,
//     TERNARY: 1,
//     IF_NULL: 1,
//     OR: 2,
//     AND: 3,
//     PLUS: 4,
//     REL: 5,
//     TIMES: 6,
//     TYPEOF: 7,
//     DELETE: 7,
//     VOID: 7,
//     NOT: 8,
//     NEG: 9,
//     INC: 10,
//     NEW: 11,
//     CALL: 12,
//     MEMBER: 13,
//     CAST: 15,
// };

const DART_PREC = {
    TYPE_IDENTIFIER: 17, //was: 17
    DOT_IDENTIFIER: 18, //was: 18
    UNARY_POSTFIX: 16,
    UNARY_PREFIX: 15,
    Multiplicative: 14, // *, /, ˜/, % Left
    Additive: 13, // +, - Left
    Shift: 12, // <<, >>, >>> Left
    Bitwise_AND: 11, // & Left
    Bitwise_XOR: 10, // ˆ Left
    Bitwise_Or: 9, // | Left
    Relational: 8, // <, >, <=, >=, as, is, is! None 8
    Equality: 7, // ==, != None 7
    Logical_AND: 6, // AND && Left
    Logical_OR: 5, // Or || Left
    If: 4, //-null ?? Left
    Conditional: 3, // e1?e2:e3 Right 3
    Cascade: 2, // .. Left
    Assignment: 1, // =, *=, /=, +=, -=, &=, ˆ=, etc. Right
    BUILTIN: 0,

    TYPE_ARGUMENTS: 12,
    TRY: 0,
    //experimental reversal:
    // UNARY_POSTFIX: 1,
    // UNARY_PREFIX: 2,
    // Multiplicative: 3, // *, /, ˜/, % Left
    // Additive: 4, // +, - Left
    // Shift: 5, // <<, >>, >>> Left
    // Bitwise_AND: 6, // & Left
    // Bitwise_XOR: 7, // ˆ Left
    // Bitwise_Or: 8 , // | Left
    // Relational: 9, // <, >, <=, >=, as, is, is! None 8
    // Equality: 10, // ==, != None 7
    // Logical_AND: 11 , // AND && Left
    // Logical_OR: 12 , // Or || Left
    // If: 13 , //-null ?? Left
    // Conditional: 14, // e1?e2:e3 Right 3
    // Cascade: 15 , // .. Left
    // Assignment: 16, // =, *=, /=, +=, -=, &=, ˆ=, etc. Right
    // BUILTIN: 17,
    IMPORT_EXPORT: 18

    // experiment:
    // UNARY_POSTFIX: 4,
    // UNARY_PREFIX: 3,
    // Multiplicative: 2, // *, /, ˜/, % Left
    // Additive: 2, // +, - Left
    // Shift: 2, // <<, >>, >>> Left
    // Bitwise_AND: 2, // & Left
    // Bitwise_XOR: 2, // ˆ Left
    // Bitwise_Or: 2 , // | Left
    // Relational: 2, // <, >, <=, >=, as, is, is! None 8
    // Equality: 2, // ==, != None 7
    // Logical_AND: 2 , // AND && Left
    // Logical_OR: 2 , // Or || Left
    // If: 2 , //-null ?? Left
    // Conditional: 2, // e1?e2:e3 Right 3
    // Cascade: 1 , // .. Left
    // Assignment: 1, // =, *=, /=, +=, -=, &=, ˆ=, etc. Right
    // BUILTIN: 0
};

// TODO: general things to add
// both string types
// adjacent strings implicitly concatenated
// var, final, const
// list, set and map literals
//get protocols in classes?
// positional parameters: cased in [] at end of type params.
// todo: type test operators: as, is, and is!
//todo: assignment operators: ??=, and ~/=
//todo: ?? operator
// todo: cascade notation: dot dot accesses each object
//todo: conditional member access: blah?.foo
//todo: rethrow keyword
//todo: override operator notations
//todo: add mixins via 'with' keyword
//todo: add the 'mixin' keyword
//todo: add collection parameters to list/map literals
//todo: correct import statements to be strings
//todo: sync* and async* functions, plus yields
//

//DONE:
//DONE: override shorter constructor notations?


module.exports = grammar({
    name: 'dart',

    externals: $ => [
        $._automatic_semicolon,
        $._template_chars_double,
        $._template_chars_single,
        $._template_chars_double_single,
        $._template_chars_single_single,
    ],

    extras: $ => [
        $.comment,
        /\s/
    ],

    supertypes: $ => [
        // $._expression,
        $._declaration,
        $._statement,
        $._literal,
        // $._primary,
        // $._type,
        // $._simple_type,
        // $._type,
    ],

    inline: $ => [
        $._ambiguous_name,
        $._class_member_definition,
    ],

    conflicts: $ => [
        // [$._metadata, $.annotated_type, $.receiver_parameter],
        // [$._metadata, $.annotated_type],
        // [$._variable_declarator_id],
        // [$._unannotated_type,$._expression],
        // [$._unannotated_type,$._expression, $.inferred_parameters],
        // [$._unannotated_type,$.method_reference],
        // [$._unannotated_type,$.generic_type],
        // [$._primary, $._unannotated_type],
        // [$._primary, $.generic_type],
        // [$._statement, $._primary],
        // [$.function_signature, $._primary,],
        // [$._type_name, $._primary,],
        // [$._simple_formal_parameter, $._primary,],
        // [$._function_formal_parameter, $._primary,],
        // [$._type_name, $._function_formal_parameter, $._primary],
        // [$._type_name, $._simple_formal_parameter],
        // [$.selector, $.assignable_selector_part],
        // [$._final_const_var_or_type, $._function_formal_parameter],
        // [$._final_const_var_or_type, $.function_signature],
        // [$.variable_declaration, $.initialized_identifier,],
        // [$.declaration, $._external_and_static],
        // [$._compound_access, $.scoped_identifier],
        // [$.explicit_constructor_invocation, $._compound_access],
        // [$._expression, $.pair],
        // [$._expression, $.labeled_statement],
        [$.block, $.set_or_map_literal],
        // [$.relational_expression],
        // [$.equality_expression],
        // [$._static_or_covariant, $.method_signature],
        // [$._expression],
        // [$.constructor_signature, $.function_signature],
        // [$.assignable_expression, $.postfix_expression],
        // [$.initialized_identifier, $._variable_declarator_id],
        // [$._expression, $._expression_without_cascade],
        // [$._type_name, $.function_signature],
        // [$._type_name, $._function_formal_parameter],
        // [$.postfix_expression, $.assignable_expression],
        // [$._simple_formal_parameter, $._primary,],
        // [ $._type_name, $._function_formal_parameter, $._primary,],
        // [$._type_not_void_not_function, $._function_type_tail],
        // [$._dot_identifier, $._type_name],
        // [$._expression],
        // [$._function_type_tails],
        // [$._type_not_void_not_function],
        // [$.cascade_section],
        // [$.assignable_expression],
        // [$._argument_list],
        [$._primary, $.function_signature],
        [$._primary, $.function_signature, $._type_name],
        [$._primary, $._type_name],
        [$.postfix_expression, $.assignable_expression, ],
        [$.variable_declaration, $.initialized_variable_definition, ],
        [$._final_const_var_or_type, $.function_signature, ],
        [$._primary, $._function_formal_parameter],
        [$._primary, $._simple_formal_parameter],
        [$._primary, $._type_name, $._function_formal_parameter],
        [$._final_const_var_or_type, $._function_formal_parameter],
        [$._primary, $.constructor_param],
        [$._normal_formal_parameters],
        [$.assignable_expression],
        [$.assignable_selector_part, $.selector],
        [$.postfix_expression],
        [$._top_level_definition, $._final_const_var_or_type],
        [$.assignable_expression, $._primary],
        [$._declared_identifier],
        [$.equality_expression],
        [$.relational_expression],
        [$._argument_list],
        [$.variable_declaration, $.initialized_identifier, ],
        [$.declaration, $._external_and_static],
        [$.method_signature, $._static_or_covariant],
        [$.constructor_signature, $._formal_parameter_part],
        [$._type_not_function, $._type_not_void],
        [$._cascade_subsection],
        [$._expression],
        [$._real_expression, $._below_relational_expression],
        [$._postfix_expression, $.assignable_expression],
        [$._postfix_expression],
        [$._top_level_definition, $.getter_signature],
        [$._top_level_definition, $.setter_signature],
        [$._top_level_definition, $.lambda_expression],
        // [$._expression_without_cascade, $._real_expression]
        // [$.constructor_signature, $._formal_parameter_part],
        // [$._unannotated_type, $.type_parameter],
        // [$.lambda_expression, $._expression],
        //     [$._primary, $.method_invocation],
        // [$.postfix_expression],
        // [$._primary, $.assignable_expression,],
        // [$.declaration, $._external_and_static],//
        //for testing only!
        //
        // [$._primary, $.labeled_statement],
        // [$.relational_expression],
        // [$.additive_expression],
        // [$.cascade_section],
        // [$._type_not_function, $._type_not_void],
        // [$._cascade_subsection],
        // [$._primary, $.generic_type],
        // [$._primary, $.generic_type, $._function_formal_parameter],
        // [$._unannotated_type, $._simple_formal_parameter],
        // [$._final_const_var_or_type, $._function_formal_parameter],
        // [$._primary, $._function_formal_parameter],
        // [$.typed_identifier, $._function_formal_parameter]
    ],

    word: $ => $.identifier,

    rules: {


        program: $ => seq(
            optional($.script_tag),
            optional($.library_name),
            repeat($.import_or_export),
            // repeat($.part_directive)
            repeat($._top_level_definition),
            //for testing:
            repeat($._statement)
        ),

        //program is library definition

        // _library_definition: $ => ,

        _top_level_definition: $ => prec.left(
            choice(
                $.class_definition,
                $.enum_declaration,
                // $.type_alias,
                seq(
                    optional($._external_builtin),
                    $.function_signature,
                    $._semicolon
                ),
                seq(
                    optional($._external_builtin),
                    $.getter_signature,
                    $._semicolon
                ),
                seq(
                    optional($._external_builtin),
                    $.setter_signature,
                    $._semicolon
                ),
                // seq(
                //     $.lambda_expression,
                //     $._semicolon
                // ),
                //    type get
                seq(
                    $.function_signature,
                    $.function_body
                ),
                seq(
                    optional($._type),
                    $._get,
                    $.identifier,
                    $.function_body
                ),
                seq(
                    optional($._type),
                    $._set,
                    $.identifier,
                    $.formal_parameter_list,
                    $.function_body
                ),
                //    type set
                //    final or const static final declaration list
                seq(
                    choice(
                        $._final_builtin,
                        $._const_builtin
                    ),
                    $._type,
                    $.static_final_declaration_list
                ),
                seq(
                    $.variable_declaration,
                    $._semicolon
                )
            ),
        ),

        // Literalss

        _literal: $ => choice(
            $.decimal_integer_literal,
            $.hex_integer_literal,
            $.octal_integer_literal,
            $.binary_integer_literal,
            $.decimal_floating_point_literal,
            $.hex_floating_point_literal,
            $.true,
            $.false,
            $.string_literal,
            $.null_literal,
            $.symbol_literal,
            $.list_literal,
            $.set_or_map_literal
        ),

        symbol_literal: $ => seq('#', $.identifier),
        //symbol literal can also be an operator?

        decimal_integer_literal: $ => token(seq(
            DIGITS,
            optional(choice('l', 'L'))
        )),

        hex_integer_literal: $ => token(seq(
            choice('0x', '0X'),
            HEX_DIGITS,
            optional(choice('l', 'L'))
        )),

        octal_integer_literal: $ => token(seq(
            choice('0o', '0O'),
            sep1(/[0-7]+/, '_'),
            optional(choice('l', 'L'))
        )),

        binary_integer_literal: $ => token(seq(
            choice('0b', '0B'),
            sep1(/[01]+/, '_'),
            optional(choice('l', 'L'))
        )),

        decimal_floating_point_literal: $ => token(choice(
            seq(DIGITS, '.', optional(DIGITS), optional(seq((/[eE]/), optional(choice('-', '+')), DIGITS)), optional(/[fFdD]/)),
            seq('.', DIGITS, optional(seq((/[eE]/), optional(choice('-', '+')), DIGITS)), optional(/[fFdD]/)),
            seq(DIGITS, /[eEpP]/, optional(choice('-', '+')), DIGITS, optional(/[fFdD]/)),
            seq(DIGITS, optional(seq((/[eE]/), optional(choice('-', '+')), DIGITS)), (/[fFdD]/))
        )),

        hex_floating_point_literal: $ => token(seq(
            choice('0x', '0X'),
            choice(
                seq(HEX_DIGITS, optional('.')),
                seq(optional(HEX_DIGITS), '.', HEX_DIGITS)
            ),
            optional(seq(
                /[eEpP]/,
                optional(choice('-', '+')),
                DIGITS,
                optional(/[fFdD]/)
            ))
        )),

        true: $ => prec(
            DART_PREC.BUILTIN,
            'true',
        ),

        false: $ => prec(
            DART_PREC.BUILTIN,
            'false',
        ),

        // character_literal: $ => token(seq(
        //     "'",
        //     repeat1(choice(
        //         /[^\\'\n]/,
        //         /\\./,
        //         /\\\n/
        //     )),
        //     "'"
        // )),

        _unused_escape_sequence: $ => token.immediate(seq(
            '\\',
            choice(
                /[^xu0-7]/,
                /[0-7]{1,3}/,
                /x[0-9a-fA-F]{2}/,
                /u[0-9a-fA-F]{4}/,
                /u{[0-9a-fA-F]+}/
            )
        )),
        escape_sequence: $ => $._unused_escape_sequence,
        template_substitution: $ => seq(
            '$',
            choice(
                seq('{',
                    $._expression,
                    '}'),
                $.identifier
            )
        ),

        // string: $ => choice(
        //     $._simple_string,
        //     seq(
        //         $._string_start,
        //         $.template_substitution,
        //         repeat(seq(
        //             $._string_middle,
        //             $.template_substitution,
        //         )),
        //         $._string_end
        //     ),
        //     seq(
        //         $._multiline_string_start,
        //         $.template_substitution,
        //         repeat(seq(
        //             $._multiline_string_middle,
        //             $.template_substitution,
        //         )),
        //         $._multiline_string_end
        //     )
        // ),

        var_substitution: $ => seq('$', $.identifier),


        //TODO: try to get the multiple strings in a row implicit concatenation?

        _double_quote_string_literal: $ => seq(
            '"', repeat(choice(/[^\\"\n]/, /\\(.|\n)/)), '"'),
        string_literal: $ => choice(
            $._string_literal_double_quotes,
            $._string_literal_single_quotes,
            $._string_literal_double_quotes_multiple,
            $._string_literal_single_quotes_multiple,
            //raw, separate later
            $._raw_string_literal_double_quotes,
            $._raw_string_literal_single_quotes,
            $._raw_string_literal_double_quotes_multiple,
            $._raw_string_literal_single_quotes_multiple
        ),

        _string_literal_double_quotes: $ => seq(
            '"',
            repeat(
                choice(
                    $._template_chars_double_single,
                    '\'',
                    $.escape_sequence,
                    $._sub_string_test,
                    $.template_substitution
                )
            ),
            '"'
        ),
        _string_literal_single_quotes: $ => seq(
            '\'',
            repeat(choice(
                $._template_chars_single_single,
                '"',
                $.escape_sequence,
                $._sub_string_test,
                $.template_substitution
            )),
            '\''
        ),
        _string_literal_double_quotes_multiple: $ => seq(
            '"""',
            repeat(choice(
                $._template_chars_double,
                '\'',
                $.escape_sequence,
                $._sub_string_test,
                $.template_substitution
            )),
            '"""'
        ),
        _string_literal_single_quotes_multiple: $ => seq(
            '\'\'\'',
            repeat(choice(
                $._template_chars_single,
                '"',
                $.escape_sequence,
                $._sub_string_test,
                $.template_substitution
            )),
            '\'\'\''
        ),
        _raw_string_literal_double_quotes: $ => seq(
            'r',
            '"',
            repeat(choice(
                $._template_chars_double_single,
                '\'',
                $._unused_escape_sequence,
                $._sub_string_test,
                '$'
            )),
            '"'
        ),
        _raw_string_literal_single_quotes: $ => seq(
            'r',
            '\'',
            repeat(choice(
                $._template_chars_single_single,
                '"',
                $._unused_escape_sequence,
                $._sub_string_test,
                '$'
            )),
            '\''
        ),
        _raw_string_literal_double_quotes_multiple: $ => seq(
            'r',
            '"""',
            repeat(choice(
                $._template_chars_double,
                '\'',
                $._unused_escape_sequence,
                $._sub_string_test,
                '$'
            )),
            '"""'
        ),
        _raw_string_literal_single_quotes_multiple: $ => seq(
            'r',
            '\'\'\'',
            repeat(choice(
                $._template_chars_single,
                '"',
                $._unused_escape_sequence,
                $._sub_string_test,
                '$'
            )),
            '\'\'\''
        ),
        _sub_string_test: $ => seq('$', /[^a-zA-Z_{]/),
        _string_interp: $ => /\$((\w+)|\{([^{}]+)\})/, // represents $word or ${word} for now
        // _double_quote_string_literal_multiline: $ => seq(
        //     '"', seq(
        //         repeat(
        //             choice(/[^\\"\n]/, /\\(.|\n)/)
        //         ),
        //         /\n/
        //     ), '"', '+', /\n/, '"',
        //     repeat(
        //         choice(/[^\\"\n]/, /\\(.|\n)/)
        //     )
        // ),

        list_literal: $ => seq(
            '[',
            commaSepTrailingComma($._element),
            ']'
        ),
        set_or_map_literal: $ => seq(
            '{',
            commaSepTrailingComma(
                $._element
            ),
            '}'
        ),
        // set_literal: $ => seq(
        //     '{',
        //     commaSep($._expression),
        //     '}'
        // ),
        // map_literal: $ => seq(
        //         '{',
        //         commaSep(
        //             $.pair
        //         ),
        //         '}'
        // ),
        pair: $ => seq(
            field('key', $._expression),
            ':',
            field('value', $._expression)
        ),
        // pair_or_element: $ => seq(
        //     field('key', $._expression),
        //     optional(
        //         seq(
        //             ':',
        //             field('value', $._expression)
        //         )
        //     )
        // ),

        _element: $ => choice(
            $._expression,
            $.pair,
            $.spread_element,
            $.if_element,
            $.for_element
        ),


        null_literal: $ => prec(
            DART_PREC.BUILTIN,
            'null',
        ),

        // Expressions

        _expression: $ => choice(
            $.assignment_expression,
            // $.binary_expression,
            // $.instanceof_expression,
            // $.lambda_expression,
            // $.conditional_expression,
            // $.update_expression,
            // prec.dynamic(1, $._ambiguous_name),
            // $._primary,
            // $.unary_expression,
            // $.cast_expression,
            //dart literals
            // $.list_literal,
            // $.set_or_map_literal,
            //dart operators
            //     $.if_null_expression,
            //    dart cascade
            $.throw_expression,
            // prec.right(
            seq(
                // $.conditional_expression,
                $._real_expression,
                repeat($.cascade_section)
            )
            // )
        ),
        _expression_without_cascade: $ => choice(
            $.assignment_expression_without_cascade,
            // $.conditional_expression,
            $._real_expression,
            $.throw_expression_without_cascade
            // $.binary_expression,
            // $.instanceof_expression,
            // $.lambda_expression,
            // $.conditional_expression,
            // $.update_expression,
            // prec.dynamic(1, $._ambiguous_name),
            // $._primary,
            // $.unary_expression,
            // $.cast_expression,
            // //dart literals
            // $.list_literal,
            // $.set_or_map_literal,
            // //dart operators
            // $.if_null_expression
        ),
        _real_expression: $ => choice(
            $.conditional_expression,
            $.logical_or_expression,
            $.if_null_expression,
            $.additive_expression,
            $.multiplicative_expression,
            $.relational_expression,
            $.await_expression,
            $.equality_expression,
            $.logical_and_expression,
            $.bitwise_and_expression,
            $.bitwise_or_expression,
            $.bitwise_xor_expression,
            $.shift_expression,
            $._unary_expression
        ),

        _below_relational_expression: $ => choice(
            //    UNARY_POSTFIX: 16,
            // UNARY_PREFIX: 15,
            // Multiplicative: 14, // *, /, ˜/, % Left
            // Additive: 13, // +, - Left
            // Shift: 12, // <<, >>, >>> Left
            // Bitwise_AND: 11, // & Left
            // Bitwise_XOR: 10, // ˆ Left
            // Bitwise_Or: 9 , // | Left
            $._unary_expression,
            $.multiplicative_expression,
            $.additive_expression,
            $.shift_expression,
            $.bitwise_and_expression,
            $.bitwise_or_expression,
            $.bitwise_xor_expression,

        ),
        throw_expression: $ => seq(
            'throw',
            $._expression

        ),
        throw_expression_without_cascade: $ => seq(
            'throw',
            $._expression_without_cascade
        ),

        // cast_expression: $ => prec(PREC.CAST, seq(
        //     '(',
        //     sep1(field('type', $._type), '&'),
        //     ')',
        //     field('value', $._expression)
        // )),

        assignment_expression: $ => prec.right(DART_PREC.Assignment, seq( //right
            field('left', $.assignable_expression),
            field('operator', $._assignment_operator),
            field('right', $._expression)
        )),

        assignment_expression_without_cascade: $ => prec.right(DART_PREC.Assignment, seq( //right
            field('left', $.assignable_expression),
            field('operator', $._assignment_operator),
            field('right', $._expression_without_cascade)
        )),

        assignable_expression: $ => choice(
            seq($._primary, repeat($.assignable_selector_part)), // dart issue?
            seq($.super, $.unconditional_assignable_selector),
            seq($.constructor_invocation, repeat1($.assignable_selector_part), $.identifier)
        ),
        assignable_selector_part: $ => seq(
            repeat($.argument_part),
            $.assignable_selector
        ),

        _assignment_operator: $ => prec(
            DART_PREC.BUILTIN,
            seq(
                //todo: use the op names in place of these.
                choice('=', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>=', '??=')

            )
        ),

        // binary_expression: $ => choice(
        //     ...[
        //         ['>', PREC.REL],
        //         ['<', PREC.REL],
        //         ['==', PREC.REL],
        //         ['>=', PREC.REL],
        //         ['<=', PREC.REL],
        //         ['!=', PREC.REL],
        //         ['&&', PREC.AND],
        //         ['||', PREC.OR],
        //         ['+', PREC.PLUS],
        //         ['-', PREC.PLUS],
        //         ['*', PREC.TIMES],
        //         ['/', PREC.TIMES],
        //         ['&', PREC.AND],
        //         ['|', PREC.OR],
        //         ['^', PREC.OR],
        //         ['%', PREC.TIMES],
        //         ['<<', PREC.TIMES],
        //         ['>>', PREC.TIMES],
        //         ['>>>', PREC.TIMES],
        //     ].map(([operator, precedence]) =>
        //         prec.left(precedence, seq(
        //             field('left', $._expression),
        //             field('operator', operator),
        //             field('right', $._expression)
        //         ))
        //     )),

        // instanceof_expression: $ => prec(PREC.REL, seq(
        //     field('left', $._expression),
        //     'instanceof',
        //     field('right', $._type)
        // )),

        lambda_expression: $ => seq(
            field('parameters', $.function_signature),
            field(
                'body',
                $.function_body
            )
        ),

        function_expression: $ => seq(
            field('parameters', $._formal_parameter_part),
            field(
                'body',
                $.function_expression_body
            )
        ),

        inferred_parameters: $ => seq(
            '(',
            commaSep1($.identifier),
            ')'
        ),


        if_null_expression: $ => prec.left( //left
            DART_PREC.If,
            seq(
                field('first',
                    $._real_expression // logical_or_expression
                ),
                $._if_null_expression
                // optional(
                //     $._if_null_expression
                // )
            )
        ),

        _if_null_expression: $ => repeat1(
            seq(
                '??',
                field('second', $._real_expression)
            )
        ),

        conditional_expression: $ => prec.left( //left
            DART_PREC.Conditional,
            seq(
                // $.if_null_expression,
                $._real_expression,
                seq(
                    '?',
                    field('consequence', $._expression_without_cascade),
                    ':',
                    field('alternative', $._expression_without_cascade)
                )
            )
        ),

        logical_or_expression: $ => prec.left( //left
            DART_PREC.Logical_OR,
            sep2($._real_expression, '||')
        ),

        logical_and_expression: $ => prec.left( //left
            DART_PREC.Logical_AND,
            sep2($._real_expression, '&&')
        ),

        equality_expression: $ => prec( //neither
            DART_PREC.Equality,
            choice(
                seq(
                    // $.relational_expression,
                    $._real_expression,
                    // optional(
                    //
                    // )

                    $.equality_operator,
                    $._real_expression
                    // $.relational_expression

                ),
                seq(
                    $.super,
                    $.equality_operator,
                    // $.relational_expression
                    $._real_expression
                )
            )
        ),

        equality_operator: $ => token(
            choice(
                '==',
                '!='
            )
        ),

        relational_expression: $ => prec( // neither
            DART_PREC.Relational,
            choice(
                seq(
                    // $.bitwise_or_expression,
                    $._below_relational_expression,
                    choice(
                        seq(
                            $.relational_operator,
                            $._below_relational_expression
                        ),
                        $.type_test,
                        $.type_cast,
                    ),
                ),
                seq(
                    $.super,
                    $.relational_operator,
                    $._below_relational_expression
                )
            )
        ),

        relational_operator: $ => choice(
            '<',
            '>',
            '>=',
            '<='
        ),

        //BITWISE EXPRESSIONS
        bitwise_or_expression: $ => binaryRunLeft($._real_expression, '|', $.super, DART_PREC.Bitwise_Or),
        bitwise_xor_expression: $ => binaryRunLeft($._real_expression, '^', $.super, DART_PREC.Bitwise_XOR),
        bitwise_and_expression: $ => binaryRunLeft($._real_expression, '&', $.super, DART_PREC.Bitwise_AND),
        shift_expression: $ => binaryRunLeft($._real_expression, $.shift_operator, $.super, DART_PREC.Shift),
        additive_expression: $ => binaryRunLeft($._real_expression, $.additive_operator, $.super, DART_PREC.Additive),
        multiplicative_expression: $ => binaryRunLeft($._real_expression, $.multiplicative_operator, $.super, DART_PREC.Multiplicative),

        bitwise_operator: $ => choice(
            '&',
            '^',
            '|'
        ),

        shift_operator: $ => choice(
            '<<',
            '>>',
            '>>>',
        ),

        additive_operator: $ => choice(
            '+',
            '-'
        ),

        multiplicative_operator: $ => choice(
            '*',
            '/',
            '%',
            '~/'
        ),

        _unary_expression: $ => choice(
            $._postfix_expression,
            $.unary_expression
        ),

        unary_expression: $ => prec( //neither
            DART_PREC.UNARY_PREFIX,
            choice(

                seq($.prefix_operator, $.unary_expression),
                $.await_expression,
                // prec(DART_PREC.UNARY_POSTFIX, $._postfix_expression),
                seq(
                    choice(
                        $.minus_operator,
                        $.tilde_operator
                    ),
                    $.super
                ),
                seq(
                    $.increment_operator,
                    $.assignable_expression
                )
            )
        ),

        _postfix_expression: $ => choice(
            seq(
                $._primary,
                repeat($.selector)
            ),
            $.postfix_expression
        ),

        postfix_expression: $ => choice(
            seq(
                $.assignable_expression,
                $.postfix_operator
            ),
            seq(
                $.constructor_invocation,
                repeat($.selector)
            )
        ),

        postfix_operator: $ => $.increment_operator,

        increment_operator: $ => token(choice(
            '++',
            '--'
        )),


        spread_element: $ => seq(
            '...',
            optional('?'),
            $._expression
        ),

        selector: $ => choice(
            '!',
            $.assignable_selector,
            $.argument_part
        ),

        prefix_operator: $ => choice(
            $.minus_operator,
            $.negation_operator,
            $.tilde_operator
        ),

        minus_operator: $ => '-',
        negation_operator: $ => '!',
        tilde_operator: $ => '~',

        await_expression: $ => seq(
            'await',
            $.unary_expression
        ),

        type_test: $ => seq(
            $.is_operator,
            $._type_not_void
        ),

        is_operator: $ => seq(
            'is',
            optional(
                '!'
            )
        ),

        type_cast: $ => seq(
            $.as_operator,
            $._type_not_void
        ),

        as_operator: $ => prec(
            DART_PREC.BUILTIN,
            'as',
        ),

        new_expression: $ => seq(
            $._new_builtin,
            $._type_not_void,
            optional(
                $._dot_identifier
            ),
            $.arguments
        ),

        _dot_identifier: $ => prec.dynamic(
            DART_PREC.DOT_IDENTIFIER,
            seq(
                '.',
                $.identifier
            )
        ),
        const_object_expression: $ => seq(
            $._const_builtin,
            $._type_not_void,
            optional(
                $._dot_identifier
            ),
            $.arguments
        ),
        // update_expression: $ => prec.left(PREC.INC, choice(
        //     seq($._expression, '++'),
        //     seq($._expression, '--'),
        //     seq('++', $._expression),
        //     seq('--', $._expression)
        // )),

        _primary: $ => choice(
            $._literal,
            $.function_expression,
            $.identifier,
            $.new_expression,
            $.const_object_expression,
            seq('(', $._expression, ')'),
            // $.class_literal,
            $.this,
            seq(
                $.super,
                $.unconditional_assignable_selector
            )
            // $.parenthesized_expression,
            // $.object_creation_expression,
            // $.field_access,
            // $.array_access,
            // $.method_invocation,
            // $.method_reference,
        ),


        parenthesized_expression: $ => seq('(', $._expression, ')'),

        _compound_access: $ => choice('.', '?.'),

        constructor_invocation: $ => seq(
            $._type_name,
            $.type_arguments,
            '.',
            $.identifier,
            $.arguments
        ),

        arguments: $ => seq('(', optional(
            seq(
                $._argument_list,
                optional(
                    ','
                )
            )
        ), ')'),

        _argument_list: $ => choice(
            commaSep1($.named_argument),
            seq(commaSep1($._expression),
                repeat(
                    seq(
                        ',',
                        commaSep1($.named_argument)
                    )
                )
            )
        ),

        named_argument: $ => seq($.label, $._expression),

        cascade_section: $ => prec.left(
            DART_PREC.Cascade,
            seq(
                '..',
                $.cascade_selector,
                repeat($.argument_part),
                repeat(
                    $._cascade_subsection
                ),
                optional(
                    $._cascade_assignment_section
                )
            )
        ),

        // prec.left(
        // DART_PREC.Cascade,
        // ),
        _cascade_subsection: $ => seq(
            $.assignable_selector,
            repeat($.argument_part)
        ),
        _cascade_assignment_section: $ => seq(
            $._assignment_operator,
            $._expression_without_cascade
        ),
        cascade_selector: $ => choice(
            seq('[', $._expression, ']'),
            $.identifier
        ),
        argument_part: $ => choice(
            seq(
                $.type_arguments,
                $.arguments
            ),
            $.arguments
        ),

        unconditional_assignable_selector: $ => choice(
            seq('[', $._expression, ']'),
            seq('.', $.identifier)
        ),

        assignable_selector: $ => choice(
            $.unconditional_assignable_selector,
            seq('?.', $.identifier)
        ),

        // method_reference: $ => seq(
        //     choice($._type, $._ambiguous_name, $._primary, $.super),
        //     '::',
        //     optional($.type_arguments),
        //     choice($._new_builtin, $.identifier)
        // ),

        type_arguments: $ => $._type_args,
        _type_args: $ => choice(
            seq(
                '<',
                '>'
            ),
            seq(
                '<',
                commaSep1($._type),
                '>'
            )
        ),

        wildcard: $ => seq(
            optional($._metadata),
            '?',
            optional($._wildcard_bounds)
        ),

        _wildcard_bounds: $ => choice(
            seq('extends', $._type),
            seq($.super, $._type)
        ),

        dimensions: $ => prec.right(repeat1(
            seq(optional($._metadata), '[', ']')
        )),

        // Statements

        _statement: $ => choice(
            $.block,
            $.local_variable_declaration,
            $.for_statement,
            $.while_statement,
            $.do_statement,
            $.switch_statement,
            $.if_statement,
            //TODO: add rethrow statement.
            // $._declaration,

            $.try_statement,
            $.break_statement,
            $.continue_statement,
            $.return_statement,
            $.yield_statement,
            $.yield_each_statement,
            $.expression_statement,
            $.assert_statement,
            // $.labeled_statement,
            $.lambda_expression
        ),

        block: $ => seq(
            '{', repeat($._statement), '}'
        ),

        expression_statement: $ => seq(
            $._expression,
            $._semicolon
        ),

        labeled_statement: $ => seq(
            $.identifier, ':', $._statement
        ),

        assert_statement: $ => $.assertion,

        assertion: $ => seq('assert', '(', $._expression, optional(seq(
            ',',
            $._expression,
            optional(',')
        )), ')'),

        switch_statement: $ => seq(
            'switch',
            field('condition', $.parenthesized_expression),
            field('body', $.switch_block)
        ),

        switch_block: $ => seq(
            '{',
            repeat(choice($.switch_label, $._statement)),
            '}'
        ),

        switch_label: $ => choice(
            seq('case', $._expression, ':'),
            seq('default', ':')
        ),

        do_statement: $ => seq(
            'do',
            field('body', $._statement),
            'while',
            field('condition', $.parenthesized_expression),
            $._semicolon
        ),

        break_statement: $ => seq('break', optional($.identifier), $._semicolon),

        continue_statement: $ => seq('continue', optional($.identifier), $._semicolon),

        yield_statement: $ => seq('yield', $._expression, $._semicolon),

        yield_each_statement: $ => seq('yield', '*', $._expression, $._semicolon),

        return_statement: $ => seq(
            'return',
            optional($._expression),
            $._semicolon
        ),

        synchronized_statement: $ => seq(
            'synchronized',
            $.parenthesized_expression,
            field('body', $.block)
        ),

        throw_statement: $ => seq('throw', $._expression, $._semicolon),

        try_statement: $ => seq(
            $._try_head,
            choice(
                $.finally_clause,
                seq(repeat1($._on_part), optional($.finally_clause))
            )
        ),
        _on_part: $ => choice(
            seq(
                $.catch_clause,
                $.block
            ),
            seq(
                'on',
                $._type_not_void,
                optional($.catch_clause),
                $.block
            )
        ),
        _try_head: $ => seq(
            'try',
            field('body', $.block),
        ),
        catch_clause: $ => seq(
            'catch',
            '(',
            $.identifier,
            optional(
                seq(
                    ',',
                    $.identifier
                )
            ),
            ')',
            // field('body', $.block)
        ),


        // catch_formal_parameter: $ => seq(
        //     optional($._metadata),
        //     $.catch_type,
        //     $._variable_declarator_id
        // ),

        catch_type: $ => sep1($._type, '|'),

        finally_clause: $ => seq('finally', $.block),

        // try_with_resources_statement: $ => seq(
        //     'try',
        //     field('resources', $.resource_specification),
        //     field('body', $.block),
        //     repeat($.catch_clause),
        //     optional($.finally_clause)
        // ),
        //
        // resource_specification: $ => seq(
        //     '(', sep1($.resource, $._semicolon), optional($._semicolon), ')'
        // ),
        //
        // resource: $ => choice(
        //     seq(
        //         optional($._metadata),
        //         field('type', $._unannotated_type),
        //         $._variable_declarator_id,
        //         '=',
        //         field('value', $._expression)
        //     ),
        //     $._ambiguous_name,
        //     $.field_access
        // ),

        if_element: $ => prec.right(seq(
            'if',
            field('condition', $.parenthesized_expression),
            field('consequence', $._element),
            optional(seq('else', field('alternative', $._element)))
        )),

        if_statement: $ => prec.right(seq(
            'if',
            field('condition', $.parenthesized_expression),
            field('consequence', $._statement),
            optional(seq('else', field('alternative', $._statement)))
        )),


        while_statement: $ => seq(
            'while',
            field('condition', $.parenthesized_expression),
            field('body', $._statement)
        ),

        for_statement: $ => seq(
            optional('await'),
            'for',
            '(',
            $._for_loop_parts,
            ')',
            field('body', $._statement)
        ),

        _for_loop_parts: $ => choice(
            seq(
                choice(
                    $._declared_identifier,
                    $.identifier
                ),
                'in',
                field('value', $._expression),
            ),
            seq(
                choice(
                    field('init', $.local_variable_declaration),
                    seq(
                        commaSep(field('init', $._expression)),
                        $._semicolon
                    )
                ),
                field('condition', optional($._expression)), $._semicolon,
                commaSep(field('update', $._expression)),
            )
        ),
        //TODO: support await for?
        // support map weirdness?
        for_element: $ => seq(
            optional('await'),
            'for',
            '(',
            $._for_loop_parts,
            ')',
            field('body', $._element)
        ),

        // Annotations

        _annotation: $ => choice(
            $.marker_annotation,
            $.annotation
        ),

        marker_annotation: $ => seq(
            '@',
            field('name', choice($.identifier, $.scoped_identifier))
        ),

        annotation: $ => seq(
            '@',
            field('name', choice($.identifier, $.scoped_identifier)),
            field('arguments', $.arguments)
        ),
        //
        // annotation_argument_list: $ => seq(
        //     '(',
        //     choice(
        //         $._element_value,
        //         commaSep($.element_value_pair),
        //     ),
        //     ')'
        // ),

        // element_value_pair: $ => seq(
        //     field('key', $.identifier),
        //     '=',
        //     field('value', $._element_value)
        // ),
        // //TODO: remove unnecessary annotation related stuff.
        // _element_value: $ => prec(1, choice(
        //     $._expression,
        //     $._annotation
        // )),

        // element_value_array_initializer: $ => seq(
        //     '{',
        //     commaSep($._element_value),
        //     optional(','),
        //     '}'
        // ),

        // Declarations

        _declaration: $ => prec(1, choice(
            // $.module_declaration,
            // $.package_declaration,
            $.import_specification,
            $.class_definition,
            // $.interface_declaration,
            // $.annotation_type_declaration,
            $.enum_declaration,
        )),

        // module_declaration: $ => seq(
        //     repeat($._annotation),
        //     optional('open'),
        //     'module',
        //     $._ambiguous_name,
        //     '{',
        //     repeat($.module_directive),
        //     '}'
        // ),

        // module_directive: $ => seq(choice(
        //     seq('requires', repeat($.requires_modifier), $.module_name),
        //     seq('exports', $._ambiguous_name, optional('to'), optional($.module_name), repeat(seq(',', $.module_name))),
        //     seq('opens', $._ambiguous_name, optional('to'), optional($.module_name), repeat(seq(',', $.module_name))),
        //     seq('uses', $._ambiguous_name),
        //     seq('provides', $._ambiguous_name, 'with', $._ambiguous_name, repeat(seq(',', $._ambiguous_name)))
        // ), $._semicolon),

        requires_modifier: $ => choice(
            'transitive',
            'static'
        ),

        module_name: $ => choice(
            $.identifier,
            seq($.module_name, '.', $.identifier)
        ),

        // package_declaration: $ => seq(
        //     repeat($._annotation),
        //     'package',
        //     $._ambiguous_name,
        //     $._semicolon
        // ),

        import_or_export: $ => prec(
            DART_PREC.IMPORT_EXPORT,
            choice(
                $.library_import,
                $.library_export
            )
        ),

        library_import: $ => seq(
            optional($._metadata),
            $.import_specification
        ),

        library_export: $ => seq(
            optional($._metadata),
            $._export,
            $.configurable_uri,
            repeat($.combinator),
            $._semicolon
        ),

        import_specification: $ => choice(
            seq(
                $._import,
                $.configurable_uri,
                optional(
                    seq(
                        $._as,
                        $.identifier
                    )
                ),
                repeat($.combinator),
                $._semicolon
            ),
            seq(
                $._import,
                $.uri,
                $._deferred,
                $._as,
                $.identifier,
                repeat($.combinator),
                $._semicolon
            )
        ),

        uri: $ => $.string_literal,

        configurable_uri: $ => seq(
            $.uri,
            repeat($.configuration_uri)
        ),

        configuration_uri: $ => seq(
            'if',
            '(',
            $.uri_test,
            ')',
            $.uri
        ),

        uri_test: $ => seq(
            $.dotted_identifier_list,
            optional(
                seq(
                    '==',
                    $.string_literal
                )
            )
        ),

        combinator: $ => choice(
            seq('show', $._identifier_list),
            seq('hide', $._identifier_list)
        ),

        _identifier_list: $ => commaSep1($.identifier),

        asterisk: $ => '*',

        enum_declaration: $ => seq(
            optional(
                $._metadata
            ),
            'enum',
            field('name', $.identifier),
            field('body', $.enum_body)
        ),

        enum_body: $ => seq(
            '{',
            commaSep1($.enum_constant),
            '}'
        ),

        // enum_body_declarations: $ => seq(
        //     $._semicolon,
        //     repeat($._class_member_definition)
        // ),

        enum_constant: $ => (seq(
            optional($._metadata),
            field('name', $.identifier),
            // field('v', optional($.class_body))
        )),

        class_definition: $ => choice(
            seq(
                optional($._metadata),
                optional('abstract'),
                'class',
                field('name', $.identifier),
                optional(field('type_parameters', $.type_parameters)),
                optional(field('superclass', $.superclass)),
                optional(field('interfaces', $.interfaces)),
                field('body', $.class_body)
            ),
            seq(
                optional($._metadata),
                optional('abstract'),
                'class',
                $.mixin_application_class
            )
        ),

        _metadata: $ => repeat1($._annotation),

        // modifiers: $ => repeat1(choice(
        //     $._annotation,
        //     // 'public',
        //     // 'protected',
        //     // 'private',
        //     'abstract',
        //     'static',
        //     'final',
        //     'strictfp',
        //     'default',
        //     'synchronized',
        //     'native',
        //     'transient',
        //     'const'
        // )),

        type_parameters: $ => seq(
            '<', commaSep1($.type_parameter), '>'
        ),

        type_parameter: $ => seq(
            optional($._metadata),
            $.identifier,
            optional($.type_bound)
        ),

        type_bound: $ => seq('extends', $._type_not_void),

        superclass: $ => choice(
            seq(
                'extends',
                $._type_not_void,
                optional($.mixins)
            ),
            $.mixins
        ),

        mixins: $ => seq(
            'with',
            $._type_not_void_list
        ),

        mixin_application_class: $ => seq(
            $.identifier,
            optional($.type_parameters),
            '=',
            $.mixin_application,
            $._semicolon
        ),

        mixin_application: $ => seq(
            $._type_not_void,
            $.mixins,
            optional($.interfaces)
        ),
        mixin_declaration: $ => seq(
            optional($._metadata),
            $._mixin,
            $.identifier,
            optional($.type_parameters),
            optional(seq(
                'on',
                $._type_not_void_list
            )),
            optional($.interfaces),
            $.class_body
        ),
        interfaces: $ => seq(
            $._implements,
            $._type_not_void_list
        ),

        interface_type_list: $ => seq(
            $._type,
            repeat(seq(',', $._type))
        ),

        class_body: $ => seq(
            '{',
            repeat(
                seq(
                    optional($._metadata),
                    $._class_member_definition
                )
            ),
            '}'
        ),

        _class_member_definition: $ => choice(
            seq($.declaration, $._semicolon),
            seq(
                $.method_signature,
                $.function_body
            ),
            // $._class_member_declaration,
            // $.block,
            // $.static_initializer,
            // $.constructor_signature
        ),

        getter_signature: $ => seq(
            optional($._type),
            $._get,
            $.identifier
        ),
        setter_signature: $ => seq(
            optional($._type),
            $._set,
            $.identifier
        ),
        method_signature: $ => choice(
            seq($.constructor_signature, optional($.initializers)),
            $.factory_constructor_signature,
            seq(
                optional($._static),
                choice(
                    $.function_signature,
                    $.getter_signature,
                    $.setter_signature
                )
            ),
            $.operator_signature
        ),

        declaration: $ => choice(
            seq($.constant_constructor_signature, optional(choice($.redirection, $.initializers))),
            seq($.constructor_signature, optional(choice($.redirection, $.initializers))),
            seq($._external,
                $.constant_constructor_signature
            ),
            seq($._external,
                $.constructor_signature
            ),
            seq(
                optional($._external_and_static),
                $.getter_signature
            ),
            seq(
                optional($._external_and_static),
                $.setter_signature

            ),
            seq(
                optional($._external),
                $.operator_signature
            ),
            seq(
                optional($._external_and_static),
                $.function_signature
            ),
            seq(
                $._static,
                $._final_or_const,
                $._type,
                $.static_final_declaration_list
            ),
            seq(
                $._final_builtin,
                optional($._type),
                $.initialized_identifier_list
            ),
            seq(
                optional($._static_or_covariant),
                choice(
                    $._type,
                    $.inferred_type
                ),
                $.initialized_identifier_list
            )
        ),
        initialized_identifier_list: $ => commaSep1(
            $.initialized_identifier
        ),
        initialized_identifier: $ => seq(
            $.identifier,
            optional(seq(
                '=',
                $._expression
            ))
        ),
        static_final_declaration_list: $ => commaSep1(
            $.static_final_declaration
        ),
        binary_operator: $ => choice(
            $.multiplicative_operator,
            $.additive_operator,
            $.shift_operator,
            $.relational_operator,
            '==',
            $.bitwise_operator
        ),
        operator_signature: $ => seq(
            optional($._type),
            $._operator,
            choice(
                '~',
                $.binary_operator,
                '[]',
                '[]='
            ),
            $.formal_parameter_list
        ),
        static_final_declaration: $ => seq(
            $.identifier,
            '=',
            $._expression
        ),

        _external_and_static: $ => seq(
            $._external,
            optional($._static)),
        _static_or_covariant: $ => choice(
            $._covariant,
            $._static
        ),
        _final_or_const: $ => choice(
            $._final_builtin,
            $._const_builtin
        ),

        static_initializer: $ => seq(
            $._static,
            $.block
        ),

        initializers: $ => seq(
            ':',
            commaSep1($.initializer_list_entry)
        ),
        initializer_list_entry: $ => choice(
            seq('super',
                //$.arguements
                $.arguments
            ),
            seq('super',
                //$.arguements
                $.arguments
            ),
            $.field_initializer,
            $.assertion
        ),

        field_initializer: $ => seq(
            optional(seq($.this, '.')),
            $.identifier,
            '=',
            // $.conditional_expression,
            $._real_expression,
            repeat(
                $.cascade_section
            )
        ),

        // constructor_signature: $ => seq(
        //      $._constructor_declarator,
        //      // optional($.throws),
        //      // field('body', choice(
        //      //     $.constructor_body,
        //      //     $._semicolon
        //      // ))
        //  ),

        factory_constructor_signature: $ => seq(
            $._factory,
            sep1($.identifier, ','),
            $.formal_parameter_list
        ),

        redirecting_factory_constructor_signature: $ => seq(
            optional($._const_builtin),
            $._factory,
            sep1($.identifier, ','),
            $.formal_parameter_list,
            '=',
            $._type_not_void,
            optional(seq('.', $.identifier))
        ),

        redirection: $ => seq(
            ':',
            $.this,
            optional(seq(
                '.',
                $.identifier
            )),
            $.arguments
        ),

        constructor_signature: $ => seq(
            field('name', seq($.identifier, optional(
                seq(
                    '.',
                    $.identifier
                )
            ))),
            field('parameters', $.formal_parameter_list)
        ),
        constant_constructor_signature: $ => seq(
            $._const_builtin,
            $.qualified,
            $.formal_parameter_list
        ),

        constructor_body: $ => seq(
            '{',
            optional($.explicit_constructor_invocation),
            repeat($._statement),
            '}'
        ),

        explicit_constructor_invocation: $ => seq(
            choice(
                seq(
                    field('type_arguments', optional($.type_arguments)),
                    field('constructor', choice($.this, $.super)),
                ),
                seq(
                    field('object', choice($._ambiguous_name, $._primary)),
                    '.',
                    field('type_arguments', optional($.type_arguments)),
                    field('constructor', $.super),
                )
            ),
            field('arguments', $.arguments),
            $._semicolon
        ),

        _ambiguous_name: $ => choice(
            $.identifier,
            $.scoped_identifier
        ),

        scoped_identifier: $ => seq(
            field('scope', choice($.identifier, $.scoped_identifier)),
            '.',
            field('name', $.identifier)
        ),



        // field_declaration: $ => seq(
        //     choice(
        //         seq(
        //             // optional($.modifiers),
        //     field('type', $._unannotated_type)
        //         ),
        //         $.inferred_type),
        //     // $._variable_declarator_list,
        //     $._semicolon
        // ),

        // annotation_type_declaration: $ => seq(
        //     // optional($._metadata),
        //     '@interface',
        //     field('name', $.identifier),
        //     field('body', $.annotation_type_body)
        // ),

        // annotation_type_body: $ => seq(
        //     '{', repeat($._annotation_type_member_declaration), '}'
        // ),
        //
        // _annotation_type_member_declaration: $ => choice(
        //     $.annotation_type_element_declaration,
        //     // $.constant_declaration,
        //     // $.class_definition,
        //     $.interface_declaration,
        //     $.annotation_type_declaration
        // ),

        // annotation_type_element_declaration: $ => seq(
        //     // optional($._metadata),
        //     field('type', $._type),
        //     field('name', $.identifier),
        //     '(', ')',
        //     field('dimensions', optional($.dimensions)),
        //     optional($._default_value),
        //     $._semicolon
        // ),

        // _default_value: $ => seq(
        //     'default',
        //     field('value', $._element_value)
        // ),

        // interface_declaration: $ => seq(
        //     // optional($._metadata),
        //     $._interface,
        //     field('name', $.identifier),
        //     field('type_parameters', optional($.type_parameters)),
        //     optional($.extends_interfaces),
        //     field('body', $.interface_body)
        // ),

        // extends_interfaces: $ => seq(
        //     'extends',
        //     $.interface_type_list
        // ),

        // interface_body: $ => seq(
        //     '{',
        //     repeat($._interface_member_declaration),
        //     '}'
        // ),

        // _interface_member_declaration: $ => choice(
        //     // $.constant_declaration,
        //     $.enum_declaration,
        //     // $.method_signature,
        //     // $.class_definition,
        //     $.interface_declaration,
        //     $.annotation_type_declaration,
        //     $._semicolon
        // ),

        // constant_declaration: $ => seq(
        //     optional($._metadata),
        //     field('type', $._unannotated_type),
        //     $._variable_declarator_list,
        //     $._semicolon
        // ),

        // _variable_declarator_list: $ => commaSep1(
        //     field('declarator', $.variable_declarator)
        // ),

        // variable_declarator: $ => seq(
        //     $._variable_declarator_id,
        //     optional(seq('=', field('value', $._variable_initializer)))
        // ),

        // _variable_declarator_id: $ => seq(
        //     field('name', $.identifier),
        //     field('dimensions', optional($.dimensions))
        // ),

        // _variable_initializer: $ => choice(
        //     $._expression,
        // ),

        variable_declaration: $ => seq(
            $._declared_identifier,
            optional(seq(
                ',',
                commaSep1($.identifier)
            ))
        ),

        initialized_variable_definition: $ => seq(
            $._declared_identifier,
            optional(seq(
                prec(DART_PREC.BUILTIN, '='),
                field('value', $._expression)
            )),
            repeat(seq(',', $.initialized_identifier))
        ),
        // initialized_identifier: $ => seq(
        //   $.identifier,
        //   optional(seq('=', $._expression))
        // ),

        _declared_identifier: $ => seq(
            optional($._metadata),
            optional($._covariant),
            $._final_const_var_or_type,
            field('name', $.identifier)
        ),

        // array_initializer: $ => seq(
        //     '{',
        //     commaSep($._variable_initializer),
        //     optional(','),
        //     '}'
        // ),

        // Types

        _final_const_var_or_type: $ => choice(
            prec.left(seq($._final_builtin, optional($._type))),
            prec.left(seq($._const_builtin, optional($._type))),
            $.inferred_type,
            $._type
        ),

        _type: $ => choice(
            $._function_type_tails,
            seq(
                $._type_not_function,
                $._function_type_tails
            ),
            $._type_not_function
            // $._unannotated_type,
            // $.annotated_type
        ),
        _type_not_function: $ => choice(
            $._type_not_void_not_function,
            $.void_type
        ),
        _type_not_void_not_function: $ => prec.right(
            choice(
                seq(
                    $._type_name,
                    optional($.type_arguments)
                ),
                $._function_builtin_identifier
            )
        ),

        function_type: $ => prec.right(
            choice(
                $._function_type_tails,
                seq(
                    $._type_not_function,
                    $._function_type_tails
                )
            )
        ),
        _function_type_tails: $ => repeat1($._function_type_tail),
        //     choice(
        //     seq(
        //         $._function_type_tail,
        //         $._function_type_tails
        //     ),
        //     $._function_type_tail
        // ),

        _function_type_tail: $ => seq(
            $._function_builtin_identifier,
            optional($.type_parameters),
            $.parameter_type_list
        ),

        parameter_type_list: $ => seq(
            '(',
            choice(
                commaSep1($.normal_parameter_type),
                seq(
                    commaSep1($.normal_parameter_type),
                    ',',
                    $.optional_parameter_types,
                ),
                $.optional_parameter_types
            ),
            ')'
        ),

        normal_parameter_type: $ => choice(
            $.typed_identifier,
            $._type
        ),

        optional_parameter_types: $ => choice(
            $.optional_positional_parameter_types,
            $.named_parameter_types
        ),

        optional_positional_parameter_types: $ => seq(
            '[',
            commaSep1($.normal_parameter_type),
            ']'
        ),
        named_parameter_types: $ => seq(
            '{',
            commaSep1($.typed_identifier),
            '}'
        ),

        _type_not_void: $ => choice(
            $.function_type,
            $._type_not_void_not_function
            // $._numeric_type,
            // $.boolean_type,
            // alias($.identifier, $.type_identifier),
            // // $.scoped_type_identifier,
            // $.generic_type
        ),

        _type_not_void_list: $ => commaSep1(
            $._type_not_void
        ),

        // _unannotated_type: $ => $._simple_type,

        // _simple_type: $ => choice(
        //     $.void_type,
        //     $._numeric_type,
        //     $.boolean_type,
        //     alias($.identifier, $.type_identifier),
        //     // $.scoped_type_identifier,
        //     $.generic_type
        // ),

        // annotated_type: $ => seq(
        //     $._metadata,
        //     $._type
        // ),

        // scoped_type_identifier: $ => seq(
        //     choice(
        //         alias($.identifier, $.type_identifier),
        //         $.scoped_type_identifier,
        //         $.generic_type
        //     ),
        //     '.',
        //     optional($._metadata),
        //     alias($.identifier, $.type_identifier)
        // ),

        // generic_type: $ => prec.dynamic(10, seq(
        //     choice(
        //         alias($.identifier, $.type_identifier),
        //         // $.scoped_type_identifier
        //     ),
        //     $.type_arguments
        // )),

        // array_type: $ => seq(
        //     field('element', $._unannotated_type),
        //     field('dimensions', $.dimensions)
        // ),

        // _numeric_type: $ => choice(
        //     $.integral_type,
        //     $.floating_point_type
        // ),

        // integral_type: $ => choice(
        //     'byte',
        //     'short',
        //     'int',
        //     'long',
        //     'char',
        //     'num'
        // ),

        _type_name: $ => prec.left(
            seq(
                alias(
                    $.identifier,
                    $.type_identifier
                ),
                optional(
                    $._type_dot_identifier
                )
            )
        ),

        _type_dot_identifier: $ => prec.dynamic(
            DART_PREC.TYPE_IDENTIFIER,
            seq(
                '.',
                alias(
                    $.identifier,
                    $.type_identifier
                )
            )
        ),

        typed_identifier: $ => seq(
            $._type,
            $.identifier
        ),

        floating_point_type: $ => choice(
            'float',
            'double'
        ),
        //TODO: change boolean to bool here and everywhere to bool
        boolean_type: $ => prec(
            DART_PREC.BUILTIN,
            'bool',
        ),

        void_type: $ => prec(
            DART_PREC.BUILTIN,
            'void',
        ),

        inferred_type: $ => prec(
            DART_PREC.BUILTIN,
            'var',
        ),

        _method_header: $ => seq(
            optional(seq(
                field('type_parameters', $.type_parameters),
                optional($._metadata)
            )),
            field('type', $._type),
            $._method_declarator,
            optional($.throws)
        ),

        _method_declarator: $ => seq(
            field('name', $.identifier),
            field('parameters', $.formal_parameter_list),
            field('dimensions', optional($.dimensions))
        ),

        function_body: $ => choice(
            seq(
                optional('async'),
                '=>',
                $._expression,
                $._semicolon
            ),
            seq(
                optional(choice(
                    'async',
                    'async*',
                    'sync*',
                )),
                $.block
            )
        ),
        function_expression_body: $ => choice(
            seq(
                optional('async'),
                '=>',
                $._expression
            ),
            seq(
                optional(choice(
                    'async',
                    'async*',
                    'sync*',
                )),
                $.block
            )
        ),
        function_signature: $ => seq(
            // optional($._metadata),
            optional($._type),
            field('name', $.identifier),
            $._formal_parameter_part
        ),

        _formal_parameter_part: $ => seq(
            optional($.type_parameters),
            $.formal_parameter_list
        ),

        // formal_parameter_list: $ => seq(
        //     '(',
        //     optional($.receiver_parameter),
        //     commaSep($.formal_parameter),
        //     optional(','),
        //     optional(
        //         choice(
        //         $.spread_parameter,
        //             $.positional_parameters
        //         )
        //     ),
        //     ')'
        // ),
        formal_parameter_list: $ => $._strict_formal_parameter_list,
        //     seq(
        //     '(',
        //     // optional($.receiver_parameter),
        //     commaSep(choice(
        //         $.formal_parameter,
        //         $.constructor_param
        //     )),
        //     optional(','),
        //     optional(
        //         choice(
        //             $.spread_parameter,
        //             $.positional_parameters
        //         )
        //     ),
        //     ')'
        // ),
        _strict_formal_parameter_list: $ => choice(
            seq(
                '(',
                ')'
            ),
            seq(
                '(',
                $._normal_formal_parameters,
                optional(
                    ','
                ),
                ')'
            ),
            seq(
                '(',
                $._normal_formal_parameters,
                ',',
                $.optional_formal_parameters,
                ')'
            ),
            seq(
                '(',
                $.optional_formal_parameters,
                ')'
            )
        ),

        _normal_formal_parameters: $ => commaSep1($.formal_parameter),
        optional_formal_parameters: $ => choice(
            $._optional_postional_formal_parameters,
            $._named_formal_parameters
        ),

        // positional_parameters: $ => seq(
        //     '[',
        //     commaSep1($.formal_parameter),
        //     optional(','),
        //     optional($.spread_parameter),
        //     ']'
        // ),

        positional_parameters: $ => seq(
            '[',
            commaSep1(
                $._default_formal_parameter
                // choice(
                //     $.formal_parameter,
                //     $.constructor_param
                // )
            ),
            // optional(','),
            // optional($.spread_parameter),
            ']'
        ),
        _optional_postional_formal_parameters: $ => seq(
            '[',
            commaSep1(
                $._default_formal_parameter
                // choice(
                //     $.formal_parameter,
                //     $.constructor_param
                // )
            ),
            // optional(','),
            // optional($.spread_parameter),
            ']'
        ),
        _named_formal_parameters: $ => seq(
            '{',
            commaSep1(
                $._default_named_parameter
                // choice(
                //     $.formal_parameter,
                //     $.constructor_param
                // )
            ),
            // optional(','),
            // optional($.spread_parameter),
            '}'
        ),

        formal_parameter: $ => $._normal_formal_parameter,

        _default_formal_parameter: $ => seq(
            $.formal_parameter,
            optional(
                seq(
                    '=',
                    $._expression
                )
            )
        ),
        _default_named_parameter: $ => choice(
            seq(
                optional(
                    'required'
                ),
                $.formal_parameter,
                optional(
                    seq(
                        '=',
                        $._expression
                    )
                )
            ),
            seq(
                optional(
                    'required'
                ),
                $.formal_parameter,
                optional(
                    seq(
                        ':',
                        $._expression
                    )
                )
            )
        ),

        _normal_formal_parameter: $ => seq(
            optional(
                $._metadata
            ),
            choice(
                $._function_formal_parameter,
                $._simple_formal_parameter,
                $.constructor_param
                // $.field_formal_parameter
            )
        ),

        _function_formal_parameter: $ => seq(
            optional(
                $._covariant
            ),
            optional(
                $._type
            ),
            $.identifier,
            $._formal_parameter_part
        ),

        _simple_formal_parameter: $ => choice(
            $._declared_identifier,
            seq(
                optional(
                    $._covariant
                ),
                $.identifier
            )
        ),
        //constructor param = field formal parameter
        constructor_param: $ => seq(
            optional($._final_const_var_or_type),
            $.this,
            '.',
            $.identifier,
            optional($._formal_parameter_part)
        ),

        receiver_parameter: $ => seq(
            optional($._metadata),
            $._type,
            optional(seq($.identifier, '.')),
            $.this
        ),

        spread_parameter: $ => seq(
            optional($._metadata),
            $._type,
            '...',
            $._declared_identifier
        ),

        throws: $ => seq(
            'throws', commaSep1($._type)
        ),

        local_variable_declaration: $ => seq(
            $.initialized_variable_definition,
            $._semicolon
        ),

        script_tag: $ => seq('#!', '\n', '\n'),

        library_name: $ => seq($._metadata, 'library', $.dotted_identifier_list),

        dotted_identifier_list: $ => sep1($.identifier, '.'),

        // method_signature: $ => seq(
        //     optional($._metadata),
        //     $._method_header,
        //     choice(field('body', $.block), $._semicolon)
        // ),

        qualified: $ => seq($.identifier,
            optional(
                seq('.', $.identifier)
            )
        ),

        // Built in identifier tokens:
        //abstract
        _as: $ => prec(
            DART_PREC.BUILTIN,
            'as',
        ),
        _covariant: $ => prec(
            DART_PREC.BUILTIN,
            'covariant',
        ),
        _deferred: $ => prec(
            DART_PREC.BUILTIN,
            'deferred',
        ),
        _dynamic: $ => prec(
            DART_PREC.BUILTIN,
            'dynamic',
        ),
        _export: $ => prec(
            DART_PREC.BUILTIN,
            'export',
        ),
        _external: $ => $._external_builtin,
        _factory: $ => prec(
            DART_PREC.BUILTIN,
            'factory',
        ),
        _function_builtin_identifier: $ => prec(
            DART_PREC.BUILTIN,
            'Function',
        ),
        _get: $ => prec(
            DART_PREC.BUILTIN,
            'get',
        ),
        _implements: $ => prec(
            DART_PREC.BUILTIN,
            'implements',
        ),
        _import: $ => prec(
            DART_PREC.BUILTIN,
            'import',
        ),
        _interface: $ => prec(
            DART_PREC.BUILTIN,
            'interface',
        ),
        _library: $ => prec(
            DART_PREC.BUILTIN,
            'library',
        ),
        _operator: $ => prec(
            DART_PREC.BUILTIN,
            'operator',
        ),
        _mixin: $ => prec(
            DART_PREC.BUILTIN,
            'mixin',
        ),
        _part: $ => prec(
            DART_PREC.BUILTIN,
            'part',
        ),
        _set: $ => prec(
            DART_PREC.BUILTIN,
            'set',
        ),
        _static: $ => prec(
            DART_PREC.BUILTIN,
            'static',
        ),
        _typedef: $ => prec(
            DART_PREC.BUILTIN,
            'typedef',
        ),
        _new_builtin: $ => prec(
            DART_PREC.BUILTIN,
            'new',
        ),
        _const_builtin: $ => prec(
            DART_PREC.BUILTIN,
            'const',
        ),
        _final_builtin: $ => prec(
            DART_PREC.BUILTIN,
            'final',
        ),
        _external_builtin: $ => prec(
            DART_PREC.BUILTIN,
            'external',
        ),
        // _try: $ => prec(
        //     DART_PREC.TRY,
        //     token.immediate('try')
        // ),
        // _less_than_builtin: $ => prec( //<
        //     DART_PREC.BUILTIN,
        //     // 'external',
        //     token('<')
        // ),
        // _greater_than_builtin: $ => prec( //>
        //     DART_PREC.BUILTIN,
        //     // 'external',
        //    token('>')
        // ),
        // _equals_builtin: $ => prec( //=
        //     DART_PREC.BUILTIN,
        //     // 'external',
        //     token('=')
        // ),
        this: $ => prec(
            DART_PREC.BUILTIN,
            'this',
        ),

        super: $ => prec(
            DART_PREC.BUILTIN,
            'super',
        ),

        label: $ => seq($.identifier, ':'),

        _semicolon: $ => seq(';', optional($._automatic_semicolon)),

        identifier: $ => /[a-zA-Z_]\w*/,
        //TODO: add support for triple-slash comments as a special category.

        // http://stackoverflow.com/questions/13014947/regex-to-match-a-c-style-multiline-comment/36328890#36328890
        comment: $ => token(choice(
            seq('//', /.*/),
            seq(
                '/*',
                /[^*]*\*+([^/*][^*]*\*+)*/,
                '/'
            )
        )),
    }
});

function sep1(rule, separator) {
    return seq(rule, repeat(seq(separator, rule)));
}

function sep2(rule, separator) {
    return seq(rule, repeat1(seq(separator, rule)));
}

function commaSep1(rule) {
    return seq(rule, repeat(seq(',', rule)))
}

function commaSep(rule) {
    return optional(commaSep1(rule))
}

function commaSep1TrailingComma(rule) {
    return seq(rule, repeat(seq(',', rule)), optional(','))
}

function commaSepTrailingComma(rule) {
    return optional(commaSep1TrailingComma(rule))
}

function binaryRunLeft(rule, separator, superItem, precedence) {
    return prec.left( //left
        precedence,
        choice(
            sep2(
                // $.bitwise_xor_expression,
                rule,
                separator
            ),
            seq(
                superItem,
                repeat1(
                    seq(
                        separator,
                        rule,
                        // $.bitwise_xor_expression
                    )
                )
            )
        )
    )
}