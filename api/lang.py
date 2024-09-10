from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

sysmsg = '''
You are an assistant that picks good train connections
from a set of possible connections presented as json.
You will reply with the id of the recommended journey and
explain why it's the best one.
Respond in JSON format in format: {text:your_response,id:connection_id}
'''


from langchain_openai import ChatOpenAI
model = ChatOpenAI(model="gpt-4o-mini", max_tokens=1000, temperature=0)

# model = ChatOpenAI(temperature=0)

# Define your desired data structure.
class Connection(BaseModel):
    description: str = Field(description="reasoning for journey choice")
    id: str = Field(description="journey id from JSON")


def prompt_llm(j, s):
    parser = JsonOutputParser(pydantic_object=Connection)
    prompt = PromptTemplate(
        template="{sysmsg}\n\nAnswer the user query with a description in a language in ask in.\n{format_instructions}\n{json}\n{query}\n",
        input_variables=["query"],
        partial_variables={
            "format_instructions": parser.get_format_instructions(),
            'json': j,
            'sysmsg': sysmsg
        }
    )
    chain = prompt | model | parser
    r = chain.invoke({"query": s})
    return r
