import React from "react";
import {
  Container,
  Paper,
  Space,
  Text,
  Flex,
  Title,
  Image,
} from "@mantine/core";

function YouthCommitteePage() {
  return (
    <Container size={"lg"} p="xs">
      <Title color={"white"} align="center">
        Студенческий совет
      </Title>
      <hr />
      <Space h={"md"} />
      <Flex direction={"column"} className={"min-h-screen bg-slate-100"} p="xs">
        <Flex gap="xs" wrap="wrap" justify={'center'}>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Сейталы кызы Мираида</Title>
            <Text size="sm">Председатель студенческого совета</Text>
          </Paper>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Орозбеков Элчибек</Title>
            <Text size="sm">Заместитель председателя студенческого совета</Text>
          </Paper>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Акназар кызы Канайым</Title>
            <Text size="sm">Секретарь председателя студенческого совета</Text>
          </Paper>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Зиябидинов Азизбек</Title>
            <Text size="sm">Заведующий сектором образования</Text>
          </Paper>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Ибираим кызы Батма</Title>
            <Text size="sm">Заведующая сектором науки</Text>
          </Paper>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Жороева Айгерим</Title>
            <Text size="sm">Заведующая сектором организации культуры</Text>
          </Paper>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Таштанбек уулу Санжар</Title>
            <Text size="sm">Заведующий сектором дебатов</Text>
          </Paper>
          <Paper className="flex flex-col justify-center items-center w-72 text-center" radius={'lg'} p="sm">
            <Image width={200} height={150} radius="xl" src="" withPlaceholder/>
            <hr className="self-stretch my-2 border-black"/>
            <Title order={4}>Бахиров Мухаммедалы</Title>
            <Text size="sm">Заведующий сектором спорта</Text>
          </Paper>
        </Flex>
      </Flex>
    </Container>
  );
}

export default YouthCommitteePage;
