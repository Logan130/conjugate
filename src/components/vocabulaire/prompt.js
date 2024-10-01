export function promptChinese(words, numWords) {
    let numSentence = (numWords > 30) ? 15 : 10;
    let numParagraph = (numWords > 30) ? 3 : 2;

    let prompt = `
    我是一名法语学习者。想象一下，您是一名学生的法语老师。通过给我句子、段落和阅读材料来帮助我学习所有这些单词。句子应该具有多种语法结构、动词变化和其他语言技巧。你应该混淆词序。还鼓励您在句子或段落中包含多个单词。 

    举例时，请考虑在句子之前放置数字标签。  请给我 ${numSentence} 个句子和 ${numParagraph} 个段落作为例子。每个段落应包含大约 100 个单词。此外，示例中的所有词汇均应加粗。您必须包含示例的中文翻译。您的示例应遵循以下格式：

    1.法语例句（中文翻译）
    2.法语例句（中文翻译）
    3.法语例句（中文翻译）
    4.法语例句（中文翻译）
    ...


    1. 法语示例段落 
    （该段的中文翻译）
    2. 法语示例段落 
    （该段的中文翻译）

    以下是这些单词：

    ${words}

    --------------------------------
    重要！！！
    确保包含以上所有单词
    --------------------------------
    `
    return prompt;
} 

export function promptEnglish(words, numWords) {
    let numSentence = (numWords > 30) ? 15 : 10;
    let numParagraph = (numWords > 30) ? 3 : 2;

    let prompt = `
    I am a French learner. Imagine you are a French teacher for students. Help me learn all of these words by giving me sentences, paragraphs, and reading. The sentences should have a variety of grammatical structures, conjugates, and other language skills. You should shuffle the order of the words. You are also encouraged to include multiple words in a sentence or paragraph. 

    When you give examples, remember to put numbered labels before the sentences.  Please give me ${numSentence} sentences and ${numParagraph} paragraphs as examples. Each paragraph should be about 100 words. In addition, all the words from the vocabulary should be emboldened in the examples. You must include the English translation of your examples. Your examples must follow this format:
    
    1. example sentence (English translation)
    2. example sentence (English translation)
    3. example sentence (English translation)
    4. example sentence (English translation)
    ...
    
    
    1. example paragraph 
    (English translation of the paragraph)
    2. example paragraph 
    (English translation of the paragraph)
    
    Here are the words:

    ${words}

    --------------------------------
    IMPORTANT!!!
    MAKE SURE TO INCLUDE ALL THE WORDS LISTED ABOVE
    --------------------------------
    `
    return prompt;
}

export function promptChineseTest(words, numWords) {
    let numParagraph = (numWords > 30) ? 3 : 2;

    let prompt = `
    我是一名法语学习者。想象一下，您是一名学生的法语老师。通过给我阅读材料和对应的问题来帮助我学习所有这些单词。阅读材料应该具有多种语法结构、动词变化和其他语言技巧。你应该混淆词序。还鼓励您在句子或段落中包含多个单词。 

    每个阅读材料的问题应该关注文章的主题重点或者里面的细节。

    举例时，请考虑在句子之前放置数字标签。  请给我${numParagraph+2} 个段落作为例子。每个段落应包含大约 150 个单词。此外，示例中的所有词汇均应加粗。您必须包含示例的中文翻译。您的示例应遵循以下格式：

    1. [阅读段落]
    Question: xxxxx
    A. xxxxxxx
    B. xxxxxxx
    C. xxxxxxx
    D. xxxxxxx

    (段落的中文翻译)
    Answer: 

    2. [阅读段落]
    Question: xxxxx
    A. xxxxxxx
    B. xxxxxxx
    C. xxxxxxx
    D. xxxxxxx

    (段落的中文翻译)
    Answer: 

    ...

    ${words}

    --------------------------------
    重要！！！
    确保包含以上所有单词
    --------------------------------
    `
    return prompt;
}

export function promptEnglishTest(words, numWords) {
    let numParagraph = (numWords > 30) ? 3 : 2;

    let prompt = `
    I am a French learner. Imagine you are a French teacher for students. Help me learn all of these words by giving passages and multiple-choice questions related to each passage. The passages should have a variety of grammatical structures, conjugates, and other language skills. You should shuffle the order of the words. You are also encouraged to include as many words as possible in a paragraph. 

    The question you ask should focus on the central idea or specific details of the passage. 

    When you give examples, remember to put numbered labels before the passages.  Please give me ${numParagraph+1} passages as examples. Each passage should be about 150 words. In addition, all the words from the vocabulary should be emboldened in the examples. You must include the English translation of your examples. Your examples must follow this format:
    
    ...
    
    1. [example passage]
    Question: xxxxx
    A. xxxxxxx
    B. xxxxxxx
    C. xxxxxxx
    D. xxxxxxx

    (English translation of the paragraph1)
    Answer: 

    2. [example passage]
    Question: xxxxx
    A. xxxxxxx
    B. xxxxxxx
    C. xxxxxxx
    D. xxxxxxx

    (English translation of the paragraph2)
    Answer: 
    
    ...

    Here are the words:

    ${words}

    --------------------------------
    IMPORTANT!!!
    MAKE SURE TO INCLUDE ALL THE WORDS LISTED ABOVE
    --------------------------------
    `
    return prompt;
}