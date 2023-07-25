import React from "react";
import { Container, Space, Flex, Title, Text, Paper, Mark } from "@mantine/core";

function ContactPage() {
  return (
    <Container size={"lg"} p="xs">
      <Title color={"white"} align="center">
        Контакты факультета
      </Title>
      <hr />
      <Space h={"md"} />
      <Flex direction={"column"} className={"min-h-screen bg-slate-100"} p="xs">
        <Flex direction="column" gap="xs" className="items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.4490669938323!2d72.79230957544932!3d40.5316668714214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bdac05225c2cfd%3A0x16bd460bd75f22ab!2z0J7RiNGB0LrQuNC5INCT0L7RgdGD0LTQsNGA0YHRgtCy0LXQvdC90YvQuSDRg9C90LjQstC10YDRgdC40YLQtdGCICjQk9C70LDQstC90YvQuSDQutC-0YDQv9GD0YEp!5e0!3m2!1sru!2skg!4v1686125340254!5m2!1sru!2skg"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="oshsu-map"
          ></iframe>
          <hr className="self-stretch my-2 border-black" />
          <Paper className="text-center bg-transparent">
            <Text size={"lg"}>
              Кыргызстан, город Ош, улица Ленина 331, 723500
            </Text>
            <Text size={"lg"} className="whitespace-pre-line">
              {`Тел.: 0(3222) 5-52-86, 0773772259, 0552414248
              WhatsApp: 0777800040, 0773772259`}
            </Text>
            <Text size={"lg"}>E-mail: <Mark color={"blue"}>MITF_OshSU@mail.ru</Mark></Text>
          </Paper>
        </Flex>
      </Flex>
    </Container>
  );
}

export default ContactPage;
